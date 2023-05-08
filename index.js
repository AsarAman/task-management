import "express-async-errors";
import express from "express";
import authRouter from "./routes/userRoutes.js";
import todosRoutes from './routes/todoRoutes.js'
import notFound from "./middlewares/notFound.js";
import connectDB from "./db/connect.js";
import dotenv from "dotenv";
import authUser from "./middlewares/authMiddleware.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from 'cors'
dotenv.config();
import {dirname} from 'path'
import { fileURLToPath } from "url";
import path from "path";

const app = express();

const __dirname= dirname(fileURLToPath(import.meta.url))
app.use(express.json());
app.use(express.static(path.resolve(__dirname,'./client/dist')))
app.use(cors())

app.get("/", (req, res) => {
  res.json({success:true, data:'hello asar jannii'});
});

app.use("/api/v1/auth", authRouter);
app.use('/api/v1/todos',authUser, todosRoutes)
app.get('*', (req,res)=>{
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})
app.use(notFound);
app.use(errorHandler);
const port = process.env.Port || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
