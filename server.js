import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { connectDB } from "./config/database.js";

config({
  path: "./config/config.env",
});

const app = express();

connectDB();

// Middlewares
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    // credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Route Imports
import userRoutes from "./routes/userRoute.js";
import examRoutes from "./routes/examsRoute.js";

app.use("/api/users", userRoutes);
app.use("/api/exams", examRoutes);

// app.get("/", (req, res) =>
//   res.send(
//     `<h1>Server is working click <a href=${process.env.FRONTEND_URL}>here</a></h1>`
//   )
// );

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});
