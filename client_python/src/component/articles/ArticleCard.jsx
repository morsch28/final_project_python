import { useState } from "react"

function ArticleCard({article}){


    return (
        <div className="card card-3d" key={article.title}>
          <img src={article.image} className="card-img-top card-img-3d"  />
          <div className="card-body card-body-3d gap-5">
            <h5 className="card-title card-title-3d">{article.title}</h5>
            <p className="card-text card-text-3d">{article.context}</p>
            <a href="#" className="btn btn-primary btn-3d">Go somewhere</a>
          </div>
          <div className="card-footer">
            <button className="border-0 bg-transparent">
              <i className="bi bi-chat-dots fs-4"></i>
            </button>
          </div>
        </div>
    )
}

export default ArticleCard