import { Link } from "react-router";

function NavbarLeftSide() {
  return (
    <div className="collapse navbar-collapse" id="navbarsExample04">
      <ul className="navbar-nav me-auto mb-2 mb-md-0 gap-2">
        <li className="nav-item">
          <Link className="nav-link active" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item dropdown">
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item">Articles</Link>
            </li>
            <li>
              <Link className="dropdown-item">Training-Program</Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/sign-up">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/sign-in">
            Sign In
          </Link>
        </li>
        <button>Logout</button>
      </ul>
    </div>
  );
}

export default NavbarLeftSide;
