import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import ArticleDetails from "../component/articles/ArticleDetails";
import { useAuth } from "../context/authContext";
import Layout from "../component/Layout";
import ArticleForm from "../component/articles/ArticleForm";
import { useEffect } from "react";
import userServices from "../services/userServices";
import UpdateArticle from "../component/articles/UpdateArticle";

function AppRouters() {
  const { isLoading, user, hasLoggedInOnce } = useAuth();

  useEffect(() => {
    userServices.refreshToken();
  }, []);

  if (isLoading) {
    return <div>Is Loading....</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          user || hasLoggedInOnce ? <Home /> : <Navigate to="/sign-in" />
        }
      />
      <Route
        path="/create-article"
        element={user?.isAdmin ? <ArticleForm /> : <Home />}
      />
      <Route
        path="/update-article/:id"
        element={user?.isAdmin ? <UpdateArticle /> : <Home />}
      />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up/" element={<SignUp />} />
      <Route path="/article-details/:id" element={<ArticleDetails />} />
    </Routes>
  );
}

export default AppRouters;
