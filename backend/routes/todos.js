import express from 'express';
import { createTodo, deleteTodo, detailTodo, readTodos, updateTodo } from '../controllers/todos.js';


const router = express.Router();

router.get('/all-todo', readTodos);
router.get('/detail-todo/:id', detailTodo);
router.post('/create-todo', createTodo);
router.patch('/update-todo/:id', updateTodo);
router.delete('/delete-todo/:id', deleteTodo);

export default router;