import express from 'express'
import { createTodo, getAllTodos, updateTodo, deleteTodo } from '../controllers/todosController.js'

const router = express.Router()

router.route('/').post(createTodo).get(getAllTodos)
router.route('/:id').delete(deleteTodo).put(updateTodo)

export default router