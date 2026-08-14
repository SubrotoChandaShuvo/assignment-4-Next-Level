import { Router } from "express";
import auth from "../../middleware/auth";
import {
  addOrder,
  getOrder,
  getOrders,
  getProviderOrders,
} from "./order.controller";

const orderRouter = Router();

orderRouter.post("/", auth("CUSTOMER"), addOrder);
orderRouter.get("/", auth("CUSTOMER"), getOrders);
orderRouter.get("/orders", auth("PROVIDER"), getProviderOrders);
orderRouter.get("/:id", auth("CUSTOMER"), getOrder);
// order
//Router.patch("/:id",auth("ranter"),editGear)
// order
//Router.delete("/:id",auth("ranter"),deleteGear)

export default orderRouter;
