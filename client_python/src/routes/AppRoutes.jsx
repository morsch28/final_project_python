import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import ArticleDetails from "../component/articles/ArticleDetails";
import { useAuth } from "../context/authContext";
import Layout from "../component/Layout";

function AppRouters() {
  const { isLoading, user, hasLoggedInOnce } = useAuth();

  if (isLoading) {
    return <div>Is Loading....</div>;
  }

  /*   if(!user){
    
    return <div className="d-flex justify-content-center"><SignIn /></div>
  } */

  return (
    <Routes>
      <Route
        path="/"
        element={
          user || hasLoggedInOnce ? <Home /> : <Navigate to="/sign-in" />
        }
      />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up/" element={<SignUp />} />
      <Route path="/article-details/:id" element={<ArticleDetails />} />
    </Routes>
  );
}

export default AppRouters;
