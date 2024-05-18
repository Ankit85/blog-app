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
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) dispatch(storeLogin(currentUser));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div>
      <div>
        <span> Already have an Account?</span>
        <Button onclick={() => navigate("/login")}>Sign In</Button>
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
          {...register("Email", {
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
      </form>
    </div>
  );
}

export default Signup;
