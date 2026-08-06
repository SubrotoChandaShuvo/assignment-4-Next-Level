import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";
import { PaymentStatus, RentalStatus, Role } from "./generated/prisma/enums";

async function main() {
  const password = await bcrypt.hash("password", 10);

  const [provider1, provider2, customer1, customer2, admin] = await Promise.all(
    [
      prisma.user.create({
        data: {
          name: "Spider Man",
          email: "spiderman@gmail.com",
          password,
          role: Role.PROVIDER,
        },
      }),
      prisma.user.create({
        data: {
          name: "Super Man",
          email: "superman@gmail.com",
          password,
          role: Role.PROVIDER,
        },
      }),
      prisma.user.create({
        data: {
          name: "Bat Man",
          email: "batman@gmail.com",
          password,
          role: Role.CUSTOMER,
        },
      }),
      prisma.user.create({
        data: {
          name: "Iron Man",
          email: "ironman@gmail.com",
          password,
          role: Role.CUSTOMER,
        },
      }),
      prisma.user.create({
        data: {
          name: "Admin User",
          email: "admin@gmail.com",
          password,
          role: Role.ADMIN,
        },
      }),
    ],
  );

  console.log("created 5 users");

  const [cycling, camping, fitness, waterSports, hiking] = await Promise.all([
    prisma.category.create({
      data: {
        name: "Cycling",
        description: "Bicycles and cycling accessories",
      },
    }),
    prisma.category.create({
      data: {
        name: "Camping",
        description: "Camping tents and outdoor equipment",
      },
    }),
    prisma.category.create({
      data: {
        name: "Fitness",
        description: "Gym and fitness equipment",
      },
    }),
    prisma.category.create({
      data: {
        name: "Water Sports",
        description: "Kayaks, paddle boards and more",
      },
    }),
    prisma.category.create({
      data: {
        name: "Hiking",
        description: "Hiking and trekking gear",
      },
    }),
  ]);

  console.log("created 5 categories");

  const [gear1, gear2, gear3, gear4, gear5] = await Promise.all([
    prisma.gearItem.create({
      data: {
        title: "Mountain Bike",
        description: "Premium mountain bike",
        brand: "Trek",
        image:
          "https://imgs.search.brave.com/Y-p6_uA5A5HLWs8c6q1N0k4jnJHn2UiEh_YAsJSZztA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTY1/NzUyNDg0L3ZlY3Rv/ci9zdW5zZXQtbW91/bnRhaW4tYmlrZS1y/aWRlLW9uLWhpZ2gt/cmlkZ2UuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPXRrUUx3/M0o5S1JzRWg3bFlP/cVZRQWExVUNQR2Np/SjgxcE0zdElwdmRC/VGM9",
        pricePerDay: 25,
        stock: 5,
        providerId: provider1.id,
        categoryId: cycling.id,
      },
    }),

    prisma.gearItem.create({
      data: {
        title: "Camping Tent",
        description: "4 Person Tent",
        brand: "Coleman",
        image:
          "https://imgs.search.brave.com/MP8MK1AMye_0iOH5Qqr98Fcg7Lhg3kpj6fBalTcH214/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjQv/NzQ1LzE4NC9zbWFs/bC90cmFucXVpbC1k/b21lLXRlbnQtaW4t/bW91bnRhaW4tbWVh/ZG93LXBlcmZlY3Qt/c3VtbWVyLWNhbXBp/bmctYWR2ZW50dXJl/LWdlbmVyYXRlZC1i/eS1haS1waG90by5q/cGc",
        pricePerDay: 20,
        stock: 8,
        providerId: provider1.id,
        categoryId: camping.id,
      },
    }),

    prisma.gearItem.create({
      data: {
        title: "Adjustable Dumbbell",
        description: "20KG Dumbbell",
        brand: "Bowflex",
        image:
          "https://imgs.search.brave.com/H23SuvRQwu7xX7fRJPRzff8gQlV1N87qYkg8WtRkFAM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kMzRt/dncxaWYzdWQwZy5j/bG91ZGZyb250Lm5l/dC81NTY5OS9NWC1T/ZWxlY3QtTVg1NS1S/YXBpZC1DaGFuZ2Ut/QWRqdXN0YWJsZS1E/dW1iYmVsbHNfMjAy/NTA0MTgtMDUxNTQy/X2Z1bGwuanBlZw",
        pricePerDay: 10,
        stock: 15,
        providerId: provider2.id,
        categoryId: fitness.id,
      },
    }),

    prisma.gearItem.create({
      data: {
        title: "Kayak",
        description: "Single Person Kayak",
        brand: "Intex",
        image:
          "https://imgs.search.brave.com/xrjbW6a6xJeMJoEkkqlGYVyRop0yoY4SXohHL5Cccjs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tYW5o/YXR0YW5rYXlhay5j/b20vd3AtY29udGVu/dC91cGxvYWRzL3Np/dGVzLzQ3MzQvMjAy/My8wNy9kYXZpZC1s/ZWUtcm90aC1lcmlj/LXN0aWxsZXIta2F5/YWtpbmctYWR2ZW50/dXJlcy5hdmlmP3c9/NjAwJnpvb209Mg",
        pricePerDay: 35,
        stock: 3,
        providerId: provider2.id,
        categoryId: waterSports.id,
      },
    }),

    prisma.gearItem.create({
      data: {
        title: "Hiking Backpack",
        description: "60L Travel Backpack",
        brand: "Osprey",
        image:
          "https://imgs.search.brave.com/IVMK6x4cTjDWRZ7f003LD1aRvVu7JS7BvZ6ZPsVy6lI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9oaWtp/bmctYmFja3BhY2st/dHJhdmVsLWdlYXIt/bW91bnRhaW4taXRl/bXMtaW5jbHVkZS1k/ZXN0aW5hdGlvbi1s/ZWlzdXJlLXZhY2F0/aW9uLWZsYXQtbGF5/LW91dGRvb3ItZXF1/aXBtZW50LTE3NjA0/NDI3MC5qcGc",
        pricePerDay: 12,
        stock: 12,
        providerId: provider1.id,
        categoryId: hiking.id,
      },
    }),
  ]);

  console.log("created 5 gear items");

  const [order1, order2, order3, order4, order5] = await Promise.all([
    prisma.rentalOrder.create({
      data: {
        customerId: customer1.id,
        gearId: gear1.id,
        quantity: 1,
        startDate: new Date("2026-08-01"),
        endDate: new Date("2026-08-04"),
        totalPrice: 50,
        status: RentalStatus.RETURNED,
      },
    }),

    prisma.rentalOrder.create({
      data: {
        customerId: customer1.id,
        gearId: gear2.id,
        quantity: 1,
        startDate: new Date("2026-08-03"),
        endDate: new Date("2026-08-05"),
        totalPrice: 40,
        status: RentalStatus.RETURNED,
      },
    }),

    prisma.rentalOrder.create({
      data: {
        customerId: customer1.id,
        gearId: gear2.id,
        quantity: 1,
        startDate: new Date("2026-08-07"),
        endDate: new Date("2026-08-15"),
        totalPrice: 40,
        status: RentalStatus.PLACED,
      },
    }),

    prisma.rentalOrder.create({
      data: {
        customerId: customer2.id,
        gearId: gear3.id,
        quantity: 2,
        startDate: new Date("2026-08-03"),
        endDate: new Date("2026-08-06"),
        totalPrice: 40,
        status: RentalStatus.RETURNED,
      },
    }),

    prisma.rentalOrder.create({
      data: {
        customerId: customer2.id,
        gearId: gear4.id,
        quantity: 1,
        startDate: new Date("2026-08-01"),
        endDate: new Date("2026-08-06"),
        totalPrice: 70,
        status: RentalStatus.RETURNED,
      },
    }),

    prisma.rentalOrder.create({
      data: {
        customerId: customer1.id,
        gearId: gear5.id,
        quantity: 1,
        startDate: new Date("2026-09-01"),
        endDate: new Date("2026-09-03"),
        totalPrice: 24,
        status: RentalStatus.CANCELLED,
      },
    }),
  ]);

  console.log("created 6 rental orders");

  await Promise.all([
    prisma.payment.create({
      data: {
        rentalOrderId: order1.id,
        transactionId: "TXN100001",
        amount: 50,
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
      },
    }),

    prisma.payment.create({
      data: {
        rentalOrderId: order2.id,
        transactionId: "TXN100002",
        amount: 40,
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
      },
    }),

    prisma.payment.create({
      data: {
        rentalOrderId: order3.id,
        transactionId: "TXN100003",
        amount: 40,
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
      },
    }),

    prisma.payment.create({
      data: {
        rentalOrderId: order4.id,
        transactionId: "TXN100004",
        amount: 70,
        status: PaymentStatus.COMPLETED,
        paidAt: new Date(),
      },
    }),

    prisma.payment.create({
      data: {
        rentalOrderId: order5.id,
        transactionId: "TXN100005",
        amount: 24,
        status: PaymentStatus.FAILED,
      },
    }),
  ]);

  console.log("created 5 payments");

  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Amazing bike!",
        customerId: customer1.id,
        gearId: gear1.id,
      },
    }),

    prisma.review.create({
      data: {
        rating: 4,
        comment: "Tent quality was very good.",
        customerId: customer1.id,
        gearId: gear2.id,
      },
    }),

    prisma.review.create({
      data: {
        rating: 5,
        comment: "Excellent dumbbells.",
        customerId: customer2.id,
        gearId: gear3.id,
      },
    }),

    prisma.review.create({
      data: {
        rating: 4,
        comment: "Kayak was fun to use.",
        customerId: customer2.id,
        gearId: gear4.id,
      },
    }),
  ]);

  console.log("created 4 reviews");
}

main().then(()=> {
    process.exit(0);
});
