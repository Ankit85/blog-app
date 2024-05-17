import { useEffect, useState } from "react";
import "./App.css";

import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          //dispatch login
          dispatch(login({ user }));
        } else {
          //dispatch logout
          dispatch(logout());
        }
      })
      .catch((err) =>
        console.log("Something went wrong while fetaching user", err)
      )
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  if (isLoading) return <>Loading....</>;
  return (
    <>
      <h1>The Production ready blog app</h1>
    </>
  );
}

export default App;
