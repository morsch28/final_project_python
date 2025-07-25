import { Link } from "react-router";
import { useAuth } from "../../context/authContext";

function NavbarLeftSide() {
  const { user, hasLoggedInOnce } = useAuth();

  return (
    <div className="collapse navbar-collapse" id="navbarsExample04">
      <ul className="navbar-nav me-auto mb-2 mb-md-0 gap-2">
        {(user || hasLoggedInOnce) && (
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
        )}
        {user.isAdmin && (
          <li className="nav-item">
            <Link className="nav-link active" to="/create-article">
              Create Article
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavbarLeftSide;
