import { Router } from "express";
import auth from "../middleware/auth";
import { createReview, getReviews } from "./review.controller";

const reviewRouter = Router();

reviewRouter.post("/", auth("CUSTOMER"), createReview);
reviewRouter.get("/", getReviews);

export default reviewRouter;
