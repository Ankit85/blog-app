import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { useDispatch } from "react-redux";
import { login as storeLogin } from "../store/authSlice";
import { Input, Button } from "./index";

function Signup() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const signup = async (data) => {
    console.log("sign up data", data);
    setError("");
    try {
      const userData = await authService.createAccount(data);
      console.log("SS user Data", userData);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        console.log("SS current User", currentUser);
        if (currentUser) {
          dispatch(storeLogin({ currentUser }));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("error sign up", error.message);
      setError(error.message);
    }
  };

  //1@3@$@%@6@7@8@9
  return (
    <div>
      <div>
        <span> Already have an Account?</span>
        <Button onClick={() => navigate("/login")}>Sign In</Button>
        {error && <p className="text-red-600 my-4 text-center">{error}</p>}
      </div>

      <form onSubmit={handleSubmit(signup)}>
        <Input
          label="Name: "
          type="text"
          placeholder="Enter your Full Name"
          {...register("name", {
            required: true,
          })}
        />
        <Input
          label="Email: "
          type="email"
          placeholder="Enter a Email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <Input
          label="Password: "
          type="password"
          placeholder="Enter your Password"
          {...register("password", {
            required: true,
          })}
        />
        <Button type="submit">Sign up</Button>
      </form>
    </div>
  );
}

export default Signup;
