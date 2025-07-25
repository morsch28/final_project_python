import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ArticleCard({ article }) {
  const navigate = useNavigate();

  return (
    <div className="mt-3 w-75">
      <div className="card mb-3 mt-">
        <div className="row">
          <div className="col-md-4">
            {article.image_file ? (
              <img
                src={article.image_file}
                className="img-fluid rounded-start"
                alt="..."
              />
            ) : (
              <img
                src={article.image}
                className="img-fluid rounded-start h-100"
                alt="..."
              />
            )}
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title fs-4">{article.title}</h5>
              <p className="card-text">{article.text}</p>
              <button
                className="btn btn-primary fs-5"
                onClick={() => navigate(`/article-details/${article.id}`)}
              >
                Read More...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
