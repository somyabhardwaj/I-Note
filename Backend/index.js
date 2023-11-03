import express from "express";
import { PORT,MONGODBURL } from "./config.js";
import mongoose from 'mongoose';

import bookRoute from './Routes/bookRoutes.js '
import cors from 'cors'
const app = express();
// Middleware for parsing request body
app.use(express.json());

// Middleware for handeling cors policy
//option 1 
app.use(cors());
//option 2: Allow custom origins

// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['content-type'],

// })) ;

app.get('/',(request,response)=>{
    console.log(request);
   return response.status(234).send("Book store is live now")
})
 
app.use('/books',bookRoute)

mongoose.connect(MONGODBURL).then(()=>{

    console.log("App is connected to Mongodb")
    app.listen(PORT, ()=>{

        console.log(`App is listing to port :${PORT}`)
    });
})
.catch((error)=>{
    console.log(error)
})