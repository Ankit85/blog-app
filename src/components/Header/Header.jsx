import { useSelector } from "react-redux";
import Container from "../Container/Container";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import Logout from "./LogoutBtn";

export const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItem = [
    { name: "Home", url: "/", active: true },
    { name: "Login", url: "/login", active: !isLoggedIn },
    { name: "Signup", url: "/signup", active: !isLoggedIn },
    { name: "All Posts", url: "/all-posts", active: isLoggedIn },
    { name: "Add Posts", url: "/add-posts", active: isLoggedIn },
  ];

  return (
    <header>
      <Container>
        <nav className="flex items-center p-4 justify-between">
          <div className="mr-4 ">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex justify-end gap-6">
            {navItem.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="px-4 py-2 rounded-lg bg-purple-950"
                    onClick={() => navigate(item.url)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {isLoggedIn && (
              <li>
                <Logout />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
