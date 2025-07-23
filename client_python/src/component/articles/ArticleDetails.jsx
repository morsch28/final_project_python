import { useEffect, useState } from "react";
import articlesServices from "../../services/articlesServices";
import { useNavigate, useParams } from "react-router-dom";

import CommentForm from "../comments/CommentForm";
import ShowAllComments from "../comments/ShowAllComments";
import { useAuth } from "../../context/authContext";

function ArticleDetails() {
  const [article, setArticle] = useState({});
  const navigate = useNavigate();
  const { user } = useAuth();

  const { id } = useParams();

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const _article = await articlesServices.getArticleById(id);
        setArticle(_article.data);
        return article;
      } catch (error) {}
    };
    loadArticle();
  }, [id]);

  return (
    <div className="d-flex flex-column align-items-center  gap-3 bgArticleDetails">
      <div className="card mb-3 w-75 mt-5 cardsShadow">
        <img src={article.image} className="card-img-top" />
        <div className="d-flex p-3 gap-5">
          <div className="fs-5 d-flex gap-1">
            <i className="bi bi-person"></i>
            {article.author_username}
          </div>
          <div className="fs-5 d-flex gap-1">
            <i className="bi bi-person"></i>
            {article.created_at
              ? new Date(article.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : ""}
          </div>
        </div>
        <div className="card-body d-flex flex-column gap-2">
          <h2 className="card-title">{article.title}</h2>
          <h5 className="card-title">{article.text}</h5>
          <p className="card-text fs-5">{article.content}</p>
          <p className="card-footer w-100">
            {user?.isAdmin && (
              <div className="d-flex gap-3 justify-content-center">
                <button className="bg-transparent fs-5 border-danger">
                  <i className="bi bi-trash3 fs-3 text-danger"></i>
                </button>
                <button className="bg-transparent fs-5 border-success">
                  <i className="bi bi-pencil fs-3 text-success"></i>
                </button>
              </div>
            )}
          </p>
        </div>
      </div>
      {article.id && <ShowAllComments articleId={article.id} />}
    </div>
  );
}
export default ArticleDetails;
