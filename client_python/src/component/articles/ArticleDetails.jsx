import { useEffect, useState } from "react";
import articlesServices from "../../services/articlesServices";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../common/Input";
import CommentForm from "../comments/CommentForm";

function ArticleDetails() {
  const [article, setArticle] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const _article = await articlesServices.getArticleById(id);
        console.log("_artic", _article.data);

        setArticle(_article.data);
        return article;
      } catch (error) {}
    };
    loadArticle();
  }, [id]);

  return (
    <div className="d-flex flex-column align-items-center mt-4 gap-3 bgArticleDetails">
      <button
        className="btn btn-primary d-flex gap-2 p-2 fs-5"
        onClick={() => navigate("/")}
      >
        <i className="bi bi-arrow-left"></i>Back to Articles
      </button>
      <div className="card mb-3 w-75 cardsShadow">
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
          <p className="card-text">
            <small className="text-body-secondary">
              Last updated 3 mins ago
            </small>
          </p>
        </div>
      </div>
      <CommentForm />
    </div>
  );
}
export default ArticleDetails;
