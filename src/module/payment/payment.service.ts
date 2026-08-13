import { string } from "zod";
import prisma from "../../lib/prisma";
import { AppError } from "../../utils/app-error";
import { stripe } from "../../lib/stripe";
import { checkout } from "./payment.controller";

export const createCheckoutSession = async (providerId: string, orderId: string)=>{
    const order = await prisma.rentalOrder.findUnique({
        where:{
            id:orderId
        },
        include:{
            gear:true,
            payment:true
        }
    })

    if(!order){
        throw new AppError(404,"Order not found")
    }
    if(order.customerId !== providerId){
        throw new AppError(404,"This is not your order")
    }
    if(order.status !== "PLACED"){
        throw new AppError(404,`Can't pay for ${order.status} order`)
    }
    if(order.payment?.status === "COMPLETED"){
        throw new AppError(404,`Order is already paid`)
    }

    const session = await stripe.checkout.sessions.create({
        mode:"payment",
        metadata:{orderId:order.id},
        success_url:"http://localhost:3000/payment/success",
        cancel_url:"http://localhost:3000/payment/cancel",
        line_items:[{
            quantity:1,
            price_data:{
                currency:"USD",
                unit_amount:Math.round(order.totalPrice*100),
                product_data:{
                    name: `${order.gear.brand} ${order.gear.title}`
                }
            }
        }]
    })

    await prisma.payment.upsert({
        where:{
            rentalOrderId: order.id
        },
        create:{
            rentalOrderId: order.id,
            amount: order.totalPrice,
            transactionId: session.id
        },
        update:{
            transactionId:session.id,
            status:"PENDING"
        }
    })

    return {checkoutUrl: session.url}
};

export const completePayment = async (orderId : string, transactionId:string)=>{
    const payment = await prisma.payment.findUnique({
        where:{rentalOrderId: orderId}
    })

    if(!payment || payment.status === "COMPLETED")
        return

    await prisma.$transaction([
        prisma.payment.update({
            where:{
                rentalOrderId: orderId,
                status: "PENDING"
            },
            data:{
                status: "COMPLETED", transactionId
            }
        }),
        prisma.rentalOrder.update({
            where:{
                id: orderId
            },
            data:{
                status:"CONFIRMED"
            }
        })
    ])
}

export const getPaymentHistory = async (customerId: string) => {
//   const payments = await prisma.payment.findMany({
//     where: {
//       rentalOrder: {
//         customerId,
//       },
//     },
//     include: {
//       rentalOrder: {
//         include: {
//           gear: true,
//         },
//       },
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   return payments;


  return prisma.payment.findMany({
    include: {
      rentalOrder: {
        include: {
          gear: true,
          customer: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getPaymentById = async (
  customerId: string,
  paymentId: string
) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      rentalOrder: {
        include: {
          gear: true,
        },
      },
    },
  });

  if (!payment) {
    throw new AppError(404, "Payment not found");
  }

  if (payment.rentalOrder.customerId !== customerId) {
    throw new AppError(403, "You are not allowed to view this payment");
  }

  return payment;
};



export const confirmStripePayment = async (
  customerId: string,
  sessionId: string
) => {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (!session) {
    throw new AppError(404, "Payment session not found");
  }

  const orderId = session.metadata?.orderId;

  if (!orderId) {
    throw new AppError(400, "Order ID not found in payment session");
  }

  const order = await prisma.rentalOrder.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new AppError(404, "Rental order not found");
  }

  if (order.customerId !== customerId) {
    throw new AppError(403, "You are not allowed to confirm this payment");
  }

  if (session.payment_status !== "paid") {
    throw new AppError(400, "Payment has not been completed");
  }

  await completePayment(orderId, session.id);

  return {
    sessionId: session.id,
    orderId,
    paymentStatus: "COMPLETED",
  };
};