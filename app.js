import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import vehicleRoutes from './routes/vehicleRoutes.js'
import seedRoutes from './routes/seedRoutes.js'
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
dotenv.config();

connectDB();

const PORT = process.env.PORT || 4000;

const app = express();

const whitelist = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      const error = new Error("Not allowed by CORS");
      error.status = 403;
      callback(error);
    }
  },
  credentials: true, // Enable sending cookies
};

app.use(cors(corsOptions));


app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/seed", seedRoutes);

app.get("/", (req, res, next) => {
  res.send("Server is ready!");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
