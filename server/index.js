import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

/// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/", router);

// enviroments

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;

// dB connections & listening

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database is connected");
    app.listen(PORT, () => {
      console.log(`Listening port : ${PORT}`);
    });
  })
  .catch((error) => console.log("Database is not connected ", error));
