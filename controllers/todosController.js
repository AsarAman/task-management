import Todo from "../models/Todo.js";
import httpStatusCodes from "http-status-codes";
import BadRequestError from "../errors/badRequest.js";

const createTodo = async (req, res) => {
  console.log(req.user);
  const { name, completed } = req.body;
  if (!name) {
    throw new BadRequestError("Please provide name");
  }
  const todo = await Todo.create({
    name,
    completed,
    createdBy: req.user.userId,
  });
  res.status(httpStatusCodes.CREATED).json({ todo });
};

const getAllTodos = async (req, res) => {
  const todos = await Todo.find({ createdBy: req.user.userId });
  res.status(httpStatusCodes.OK).json({ todos, amount: todos.length });
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { name, completed } = req.body;

  const todo = await Todo.findOneAndUpdate(
    { _id: id, createdBy: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!todo) {
    return res
      .status(httpStatusCodes.NOT_FOUND)
      .json({ success: false, msg: `No task found with id ${id}` });
  }
  res.status(httpStatusCodes.OK).json({ todo });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findOneAndDelete({
    _id: id,
    createdBy: req.user.userId,
  });
  if (!todo) {
    return res
      .status(httpStatusCodes.NOT_FOUND)
      .json({ success: false, msg: `No task found with id ${id}` });
  }
  res
    .status(httpStatusCodes.OK)
    .json({ success: true, msg: "Item deleted successfully" });
};

export { createTodo, getAllTodos, updateTodo, deleteTodo };
