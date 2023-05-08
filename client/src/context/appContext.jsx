import React, { useContext, useReducer,useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  
  GET_ALLTASKS_BEGIN,
  GET_ALLTASKS_SUCCESS,
  
  DELETE_ITEM_BEGIN,
  DELETE_ITEM_SUCCESS,
  
  EDIT_ITEM_BEGIN,
  
  
} from "./action";

const AppContext = React.createContext();

const userName = localStorage.getItem("username");
const accessToken = localStorage.getItem("token");
const userUniqueId = localStorage.getItem("userId");

const initialState = {
  isLoading: false,
  user: userName || null,
  userId: userUniqueId || null,
  token: accessToken || null,
  alretText: null,
  tasks: [],
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setUserToLocalStorage = (userName, token, id) => {
    localStorage.setItem("username", userName);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
  };

  const registerUser = async (userData) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        userData
      );
      const {
        user: { name, userId },
        token,
      } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { name, token, userId },
      });
      setUserToLocalStorage(name, token, userId);
    } catch (error) {
      const { message } = error.response.data;
      dispatch({ type: REGISTER_USER_ERROR, payload: { message } });
      console.log(error);
    }
  };

  const loginUser = async (userData) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        userData
      );
      const {
        user: { name, userId },
        token,
      } = response.data;
      dispatch({ type: LOGIN_USER_SUCCESS, payload: { name, token, userId } });
      setUserToLocalStorage(name, token, userId);
    } catch (error) {
      const { message } = error.response.data;
      dispatch({ type: LOGIN_USER_ERROR, payload: { message } });
    }
  };

  const createTask = async (data) => {
    console.log(data);
    dispatch({ type: CREATE_TASK_BEGIN });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/todos",
        data,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      const result = response.data;
      dispatch({ type: CREATE_TASK_SUCCESS, payload: { result } });
      return;
    } catch (error) {
      // const {message} = error.response
      // dispatch({type:CREATE_TASK_ERROR, payload:{message}})
      console.log(error);
    }
  };

  const getTasks = async () =>{
    dispatch({type:GET_ALLTASKS_BEGIN})
    try {
      const response = await axios.get("http://localhost:5000/api/v1/todos",{
        headers:{
          Authorization:`Bearer ${state.token}`
        }
      })
      
      const todos = response.data.todos
      dispatch({type:GET_ALLTASKS_SUCCESS, payload:todos})
    } catch (error) {
      console.log(error)
    }
  }

  const deleteTask = async(id) =>{
    
    dispatch({type:DELETE_ITEM_BEGIN})
    try {
      const response = await axios.delete(`http://localhost:5000/api/v1/todos/${id}`,{
        headers:{
          Authorization:`Bearer ${state.token}`
        }
      })
      dispatch({type:DELETE_ITEM_SUCCESS, payload:{message:response.data.msg}})
      
    } catch (error) {
      console.log(error)
    }
  }

  const editTask = async(id,editData) =>{
    console.log(id,editData)
    dispatch({type:EDIT_ITEM_BEGIN})
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/todos/${id}`, editData,{
        headers:{
          Authorization:`Bearer ${state.token}`
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

 

  return (
    <AppContext.Provider
      value={{ ...state, registerUser, loginUser, createTask,getTasks, deleteTask, editTask}}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppProvider, AppContext };
