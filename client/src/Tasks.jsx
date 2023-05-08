import React, { useState,useEffect } from "react";
import { useGlobalContext } from "./context/appContext";

const Tasks = () => {
  const [values, setValues] = useState({
    name: "",
    completed: true,
  });
  const { createTask, tasks,getTasks, deleteTask, editTask } = useGlobalContext();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, completed } = values;
    createTask({ name, completed });
  };
  useEffect(()=>{
    getTasks()
  },[tasks])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create a Task</h1>
        <div>
          <label htmlFor="name">Task Name</label>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="completed">Completed</label>
          <select
            value={values.completed}
            onChange={handleChange}
            name="completed"
            id="completed"
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
      <div>
        {tasks.length > 0 ? (
          tasks.map((item, index) => {
            return (
              <div key={index}>
            <p className="item-p" key={item._id}>{item.name}</p>
            
            <div>
              <button onClick={()=> deleteTask(item._id)}>delete</button>
              <button onClick={()=> editTask(item._id, {name:values.name, completed:values.completed})}>edit</button>
            </div>
            
            </div>
            
            )
            
            
          })
        ) : (
          <h3>No tasks to display</h3>
        )}
      </div>
    </div>
  );
};

export default Tasks;
