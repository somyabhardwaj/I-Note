import express from "express";
import { PORT,MONGODBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./modules/bookModule.js";


const app = express();

app.get('/',(request,response)=>{
    console.log(request);
   return response.status(234).send("Hello Somya")
})
// Route for save a book

app.post('/books', async (request,response)=>{
    try{
        if(
            !request.body.title || request.body.author ||request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all fields: title , author , publishYear'
            })
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        }; 
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch (err){
        console.log(err.message);
        response.status(500).send({message:err.message})
    }
})

mongoose.connect(MONGODBURL).then(()=>{

    console.log("App is connected to Mongodb")
    app.listen(PORT, ()=>{

        console.log(`App is listing to port :${PORT}`)
    });
})
.catch((error)=>{
    console.log(error)
})