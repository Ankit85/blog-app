import { useEffect, useState } from "react";
// import "./App.css";

import authService from "./appwrite/auth";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

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

  if (isLoading) return <>App Loading....</>;
  return (
    <main className="bg-gray-900 min-h-screen text-white">
      {/* <h1>The Production ready blog app</h1>
       */}

      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default App;
