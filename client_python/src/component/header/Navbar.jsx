import { useAuth } from "../../context/authContext";
import NavbarLeftSide from "./NavbarLeftSide";
import NavbarRightSide from "./NavbarRightSide";

function Navbar() {
  const { user } = useAuth();
  console.log("Navbar user:", user);
  return (
    <nav
      className="navbar navbar-expand-md navbar text-dark bg-body-secondary "
      aria-label="Fourth navbar example"
    >
      <div className="container fs-5">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample04"
          aria-controls="navbarsExample04"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {!user ? (
          <NavbarRightSide />
        ) : (
          <>
            <NavbarLeftSide />
            <NavbarRightSide />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
