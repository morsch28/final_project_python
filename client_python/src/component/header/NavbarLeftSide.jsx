import { Link } from "react-router";
import { useAuth } from "../../context/authContext";

function NavbarLeftSide() {
  const { user } = useAuth();
  console.log("Navbar user:", user);
  return (
    <div className="collapse navbar-collapse" id="navbarsExample04">
      <ul className="navbar-nav me-auto mb-2 mb-md-0 gap-2">
        {user ? (
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

export default NavbarLeftSide;
