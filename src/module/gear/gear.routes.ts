import { Router } from "express";
import { getGear, getGears } from "./gear.controller";


const gearRouter = Router()

gearRouter.get("/",getGears)
gearRouter.get("/:id",getGear)
// gearRouter.post("/",auth("ranter"),postGear)
// gearRouter.patch("/:id",auth("ranter"),editGear)
// gearRouter.delete("/:id",auth("ranter"),deleteGear)

export default gearRouter;