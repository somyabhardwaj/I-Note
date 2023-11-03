
import express from 'express';
import {Book} from '../modules/bookModule.js'
const router =express.Router()
// Route for save a book
router.post('/', async (request,response)=>{
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
router.get('/', async (request,response)=>{
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
router.get('//:id', async (request,response)=>{
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
router.put('//:id', async (request, response)=>{
    try{
    if(
        !request.body.title || !request.body.author|| !request.body. publishYear
    ){
        return response.status(400).send({
            message:'Send all fields: title , author , publishYear'
        })
    }
    const {id} = request.params;
    const result = await Book.findByIdAndUpdate(id,request.body);

    if (!result){
        return response.status(404).json({message:'Book not found'})
    }
    return response.status(200).send({message:'Book Updated'})
    
}
    catch(err){
        console.log(error.message)
        response.status(500).send({message:err.message});
    }

})
router.delete('//:id', async (request,response)=>{
try{
    
    const {id} = request.params;

    const result = await Book.findByIdAndDelete(id)
    
    if(!result){
        return response.status(404).json({message:'Book not found'})
    }
    return response.status(200).json({message: 'Book deleted'})
}catch (err){
    console.log(err.message)
    return response.status(500).send({message:err.message})
}
})

export default router;