import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login as storeLogin } from "../store/authSlice";
import { Input, Button } from "./index";

function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(storeLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <div>
        <span>Don&apos;t have an Account.</span>
        <Button
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create Account
        </Button>
      </div>
      {error && <p className="text-red-600 mt-4 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit(login)}>
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
          placeholder="Enter a password"
          {...register("password", {
            required: true,
          })}
        />

        <Button type="submit">Login </Button>
      </form>
    </div>
  );
}

export default Login;
