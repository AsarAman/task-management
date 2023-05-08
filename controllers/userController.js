import User from "../models/User.js";
import BadRequestError from "../errors/badRequest.js";
import httpStatusCodes from "http-status-codes";
import authError from "../errors/authError.js";
import bcrypt from 'bcryptjs'


const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const person = await User.create({ name, email, password });
  const token = person.assignJWT();
  res
    .status(httpStatusCodes.CREATED)
    .json({ user: { name: person.name, userId:person._id }, token });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const person = await User.findOne({ email });
  if (!person) {
    throw new authError("Invalid credentials");
  }
  const passwordCorrect =  await person.comparePassword(password)
  
 
 
  if (!passwordCorrect) {
    throw new authError("Invalid credentials");
  }
  const token = person.assignJWT();
  res.status(httpStatusCodes.OK).json({ user: { name: person.name, userId:person._id }, token });
};

export { registerUser, loginUser };
