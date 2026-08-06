import { Router } from "express";
import auth from "../../middleware/auth";
import { getCars } from "./car.controller";

const carRouter = Router();

carRouter.get("/", getCars);
// carRouter.get("/:id",getCarById);
// carRouter.post("/",auth("OWNER"), createCar);
// carRouter.patch("/:id",auth("OWNER"), updateCar);
// carRouter.delete("/:id",auth("ADMIN","OWNER"), deleteCar);

export default carRouter;