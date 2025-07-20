import { Link, useNavigate } from "react-router";

import {useAuth} from "../../context/authContext"
import SignUp from "../../pages/SignUp";

function NavbarRightSide() {
  const {user} = useAuth()
 
  return (
    <div className="collapse navbar-collapse">
      <div className="dropdown">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2922/2922510.png"
          className="rounded-circle bg-primary"
          width="70"
          height="70"
          role="button"
          id="userDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ cursor: "pointer" }}
        />
        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="userDropdown"
          data-bs-auto-close="true"
        >
            <li className=" fs-5 d-flex flex-column fw-bold">
              <button
                className="dropdown-item text-danger d-flex gap-2"
              >
                Logout
                <i className="bi bi-box-arrow-right"></i>
              </button>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarRightSide;
