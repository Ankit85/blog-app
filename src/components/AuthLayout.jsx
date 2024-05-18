/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProtectedLayout({ children, authentication = true }) {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  useEffect(() => {
    //true && (false !== true) ==> true
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      //!true ==> false && (true !== true) ==> false
      navigate("/");
    }
    setIsLoading(false);
  }, [authStatus, authentication, navigate]);

  return isLoading ? <div>Loading...</div> : { children };
}

export default ProtectedLayout;
