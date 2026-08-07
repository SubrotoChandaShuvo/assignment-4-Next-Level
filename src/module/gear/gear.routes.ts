import { Router } from "express";
import { addGear, getGear, getGears } from "./gear.controller";
import auth from "../../middleware/auth";


const gearRouter = Router()

gearRouter.get("/",getGears)
gearRouter.get("/:id",getGear)
gearRouter.post("/",auth("PROVIDER"),addGear)
// gearRouter.patch("/:id",auth("ranter"),editGear)
// gearRouter.delete("/:id",auth("ranter"),deleteGear)

export default gearRouter;