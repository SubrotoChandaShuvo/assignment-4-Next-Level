import express, { type Application } from "express";
import config from "./config";


const app: Application = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log(config.NODE_ENV);
app.get("/", async (req, res) => {
  res.send("server is running");
});

export default app;

