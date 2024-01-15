import mongoose from 'mongoose';
import Todo from '../models/todos.js';
import Priority from '../models/priority.js';

export const readTodos = async (req, res) => {
    const priorityId = await Todo.find()    
    // console.log("==priority==", priorityId)
    try {
        const todos = await Todo.find();
        res.status(200).json({
            msg: "Success get data todos!", 
            error: false, total: 
            todos.length , 
            todos
        });
    } catch (error) {
        res.status(404).json({
            msg: "Failed to get data", 
            error: true, 
            errorMsg: error.message 
        })
    }
}

export const createTodo = async (req, res) => {
    const todo = new Todo(req.body);
    try {
        await todo.save();
        res.status(201).json({
            msg: "Succes insert data!",
            error: false, 
            todo
        });
    } catch (error) {
        res.status(409).json({
            msg:"Failed insert data!",
            error: true, 
            errorMsg: error.message 
        })
    }
}

export const updateTodo = async (req, res) => {
    const {id} = req.params
    const { title, content, priority } = req.body    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`The id ${id} is not valid!`)
    }
    const todo ={title,content,priority,_id: id}
    await Todo.findByIdAndUpdate(id, todo, {
        new: true
    })
    res.json({
        msg: 'Success Update todo!' , 
        error: false, 
        todo
    })
}

export const deleteTodo = async (req, res) => {
    const {id} = req.params    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send(`The id ${id} is not valid!`)
    }
    await Todo.findByIdAndDelete(id)
    res.json({ 
        msg : 'Delete Success!', 
        error: false
    })
}

export const detailTodo = async (req, res) => {
    const {id} = req.params        
    try {
        const todo = await Todo.findById(id)
        const data = []
        data.push(todo)
        if(todo == null){
            res.json({ 
                message : 'Data not found!', 
                error: true, 
            })        
        } else {
            res.json({ 
                message : 'Success get detail!', 
                error: false, 
                data
            })    
        }
    } catch (error) {
        console.log(error)
        res.status(404).send(`The id ${id} is not valid!`)
    }
}