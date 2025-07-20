import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Header from "./header/Header";
import Main from "./main/Main";
import { useEffect } from "react";
import SignIn from "../pages/SignIn";

function Layout() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  //בהתחלהמה שביו אפקט שמתי בתנאים רגילים ולא ביוז אפקרט וזה לא עבד
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/sign-in");
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <div>Is Loading</div>;
  }
  if (!user) {
    return <SignIn />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Main />
    </div>
  );
}

export default Layout;
