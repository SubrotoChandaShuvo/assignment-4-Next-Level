import { Router } from "express";
import auth from "../../middleware/auth";
import { addOrder } from "./order.controller";


const orderRouter = Router()


orderRouter.post("/",auth("CUSTOMER"),addOrder)
// order
//Router.patch("/:id",auth("ranter"),editGear)
// order
//Router.delete("/:id",auth("ranter"),deleteGear)

export default orderRouter;