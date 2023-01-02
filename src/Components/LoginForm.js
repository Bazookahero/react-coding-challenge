import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";



const LoginForm = () => {
  const { register, handleSubmit, formState: {errors}, reset } = useForm();
  const [loggedIn, setLoggedIn] = useState(false);


  const onSubmit = (data) =>{
    axios
      .post(`https://test.zyax.se/access/`, data)
      .then((Response) => {
        localStorage.setItem("token", Response.data.accessToken);
      })
      .then(() => {
        setLoggedIn(true);
      })
      .catch((Error) => console.log(Error))
      reset();
    }




    const LogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    reset();
  };
  

  const LogOutButton = () => {
    let aToken = localStorage.getItem("token");
    if (loggedIn === true && aToken !== null) {
      return (
        <button
          data-testid="logOutButton"
          type="reset"
          onClick={LogOut}
          className="me-4 btn btn-danger btn-lg btn-block"
        >
          Log Out
        </button>
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-3 mb-3" label="loginForm">
        <div className="mb-3">
          <fieldset disabled={onsubmit}>
          <label style={{ margin: 10 }}>Email:</label>
          <input 
            data-testid="email"
            required
            type="text" 
            placeholder="Enter Email" 
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is invalid."
              }
            })} 
          />
          {errors.email && <p className="errorMsg" style={{color: "red"}}>{errors.email.message}</p>}
          </fieldset>
        </div>
        <div className="mb-3">
        <fieldset disabled={onsubmit}>
          <label style={{ margin: 10 }}>Password:</label>
          <input
            data-testid="password"
            required
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              required: "Password is required."
            })}
          />
          {errors.password && (<p className="errorMsg" style={{color: "red"}}>{errors.password.message}</p>)}
          </fieldset>
        </div>
        <button
          type="submit"
          value="Submit"
          className="me-4 btn btn-success btn-lg btn-block"
          disabled={onsubmit}
        >
          Submit
        </button>
        <LogOutButton />
      </form>
    </div>
  );
};


export default LoginForm;