import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/authContext";
import userServices from "../../services/userServices";
import feedbackService from "../../services/feedbackService";

function NavbarRightSide() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [userName, setUserName] = useState("");

  const myFlaticonImage =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const handleLogout = async () => {
    const result = await feedbackService.showConfirm({
      text: "Are you sure you want to logout?",
    });
    if (result.isConfirmed) {
      logout();
      navigate("/");
    }
  };
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
                onClick={handleLogout}
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
