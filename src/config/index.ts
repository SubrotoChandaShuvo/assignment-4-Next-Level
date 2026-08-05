import { configDotenv } from "dotenv";

configDotenv()

const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL || "",
};

export default config;