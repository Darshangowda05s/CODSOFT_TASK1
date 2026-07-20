import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { errorHandler } from "./middleware/error.middleware.js";

const app=express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


app.use("/",(req,res,next)=>{
    res.send("hello world");
});


app.use(errorHandler);

export default app;