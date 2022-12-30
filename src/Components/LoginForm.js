import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const [loggedIn, setLoggedIn] = useState(false);

  const onSubmit = (data) =>
    axios
      .post(`https://test.zyax.se/access/`, data)
      .then((Response) => {
        localStorage.setItem("token", Response.data.accessToken);
      })
      .then(() => {
        setLoggedIn(true);
      })
      .catch((Error) => console.log(Error));

  const LogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const LogOutButton = () => {
    let aToken = localStorage.getItem("token");
    if (loggedIn === true && aToken !== null) {
      return (
        <button
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
      <form onSubmit={handleSubmit(onSubmit)} className="container mt-3 mb-3">
        <div className="mb-3">
          <label style={{ margin: 10 }}>Email:</label>
          <input type="text" placeholder="Enter Email" {...register("email")} />
        </div>
        <div className="mb-3">
          <label style={{ margin: 10 }}>Password:</label>
          <input
            type="password"
            placeholder="Enter Password"
            {...register("password")}
          />
        </div>
        <button
          type="submit"
          value="Submit"
          className="me-4 btn btn-success btn-lg btn-block"
        >
          Submit
        </button>
        <LogOutButton />
      </form>
    </div>
  );
};

export default LoginForm;
