import express from "express";
import { config } from "dotenv";
import cors from 'cors'
import morgan from "morgan";
import userRoutes from "./src/routes/user.routes.js";
import tasksRouter from "./src/routes/tasks.routes.js";

const app = express();

config();

app.use(morgan("dev")); //listening to request in console

//middlewares
app.use(cors())
app.use(express.json());
app.use("/user", userRoutes);
app.use("/task", tasksRouter);

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server listening on Port http://localhost:${PORT}`);
});
