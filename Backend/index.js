import express from "express";
import { PORT,MONGODBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./modules/bookModule.js";


const app = express();
// Middleware for parsing request body
app.use(express.json());
app.get('/',(request,response)=>{
    console.log(request);
   return response.status(234).send("Book store is live now")
})
// Route for save a book

app.post('/books', async (request,response)=>{
    try{
        if(
            !request.body.title || !request.body.author|| !request.body. publishYear
        ){
            return response.status(400).send({
                message:'Send all fields: title , author , publishYear'
            })
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body. publishYear,
        }; 
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch (err){
        console.log(err.message);
        response.status(500).send({message:err.message})
    }
});
// Rout for get all books from database
app.get('/books', async (request,response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books,
        })
    }catch(err){
        console.log(err.message);
        response.status(500).send({message:err.message})
    }
})
// Rout for get one book by id from database
app.get('/books/:id', async (request,response)=>{
    try{
        const {id} = request.params
        const books = await Book.findById(id);
        return response.status(200).json({
            count:books.length,
            data:books,
        })
    }catch(err){
        console.log(err.message);
        response.status(500).send({message:err.message})
    }
})
app.put('/books/:id', async (request, response)=>{
    if(
        !request.body.title || !request.body.author|| !request.body. publishYear
    ){
        return response.status(400).send({
            message:'Send all fields: title , author , publishYear'
        })
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