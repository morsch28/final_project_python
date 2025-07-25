import articlesServices from "../../services/articlesServices";
import { useNavigate } from "react-router-dom";
import ShowAllComments from "../comments/ShowAllComments";
import { useAuth } from "../../context/authContext";
import useArticle from "../../hooks/useArticle";

function ArticleDetails() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { article, hasError, isLoading } = useArticle();

  const handleDelete = async (id) => {
    try {
      const response = await articlesServices.deleteArticle(id);
      if (response) {
        navigate("/");
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <div>Loading Articles</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center  gap-3 bgArticleDetails">
      <div className="card mb-3 w-75 mt-5 cardsShadow">
        {hasError ? (
          <div className="alert alert-danger">
            Server error can't load article
          </div>
        ) : (
          <>
            {article.image_file ? (
              <img src={article.image_file} className="card-img-top" />
            ) : (
              <img src={article.image} className="card-img-top" />
            )}
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
              <div className="card-footer w-100">
                {user?.isAdmin && (
                  <div className="d-flex gap-3 justify-content-center">
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="bg-transparent fs-5 border-danger"
                    >
                      <i className="bi bi-trash3 fs-3 text-danger"></i>
                    </button>
                    <button
                      onClick={() => navigate(`/update-article/${article.id}`)}
                      className="bg-transparent fs-5 border-success"
                    >
                      <i className="bi bi-pencil fs-3 text-success"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {article.id && <ShowAllComments articleId={article.id} />}
    </div>
  );
}
export default ArticleDetails;
