import { Router } from "express";
import { addGear, deleteGear, getGear, getGears, updateGear } from "./gear.controller";
import auth from "../../middleware/auth";

const gearRouter = Router();

gearRouter.get("/", getGears);
gearRouter.get("/:id", getGear);
gearRouter.post("/", auth("PROVIDER"), addGear);
gearRouter.put("/:id", auth("PROVIDER"), updateGear);
gearRouter.delete("/:id", auth("PROVIDER"), deleteGear);

export default gearRouter;
