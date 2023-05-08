import React, { useState,useEffect } from "react";
import { useGlobalContext } from "./context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "asar",
  email: "something",
  password: "some",
  isMember: false,
};
const Register = () => {
  const [values, setValues] = useState(initialState);
  const { registerUser, isLoading,loginUser ,user} = useGlobalContext();
  const navigate = useNavigate()
  useEffect(()=>{
    if(user){
      navigate('/tasks')

    }
  },[user])
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password, email } = values;
    if (!email || !password || (!values.isMember && !name)) {
      console.log("please provide all values that are missing");
    }
    if(values.isMember){
      return loginUser({email, password})
    }
    registerUser({ name, email, password });
  };
  return (
    <article className="register-section">
      <form className="register-form">
        <h1>TodoApp</h1>
        <h2> {values.isMember ? "Login" : "Register"} </h2>
        {!values.isMember && (
          <div className="input-div">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
            ></input>
          </div>
        )}
        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          ></input>
        </div>
        <div className="input-div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
          ></input>
        </div>

        <button
          disabled={isLoading}
          className="submit-btn"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button className="toggle-btn" type="button" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </article>
  );
};

export default Register;
