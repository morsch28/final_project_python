import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";
import userServices from "../../services/userServices";

function NavbarRightSide() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("");

  const myFlaticonImage =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  return (
    <div className="position-relative">
      <img
        src={myFlaticonImage}
        className="rounded-circle bg-primary"
        width="70"
        height="70"
        role="button"
        alt="User"
        onClick={() => setShowMenu(!showMenu)}
      />

      {showMenu && (
        <ul className="dropdown-menu show position-absolute end-0 mt-2">
          {user ? (
            <li className="fs-5 d-flex flex-column fw-bold">
              <p>{`Welcome ${userName}`}</p>
              <button
                className="dropdown-item text-danger d-flex gap-2"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Logout
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </li>
          ) : (
            <>
              <li className="fs-5 d-flex flex-column fw-bold">
                <button
                  className="dropdown-item text-primary d-flex gap-2"
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/sign-up");
                  }}
                >
                  Sign Up
                  <i className="bi bi-person-plus"></i>
                </button>
              </li>
              <li className="fs-5 d-flex flex-column fw-bold">
                <button
                  className="dropdown-item text-success d-flex gap-2"
                  onClick={() => {
                    setShowMenu(false);
                    navigate("/sign-in");
                  }}
                >
                  Sign In
                  <i className="bi bi-box-arrow-in-right"></i>
                </button>
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default NavbarRightSide;
