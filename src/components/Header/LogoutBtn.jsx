import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button className="px-4 py-2 rounded-lg" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
