import { useEffect, useState } from "react";
import articlesServices from "../services/articlesServices";
import ArticleCard from "../component/articles/ArticleCard";
import PageHeader from "../component/common/PageHeader";
import Input from "../component/common/Input";
import { useAuth } from "../context/authContext";
import userServices from "../services/userServices";

function Home() {
  const [allArticles, setAllArticles] = useState([]);
  const [filterArticles, setFilterArticle] = useState([]);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const { user } = useAuth();

  const loadLatestArticles = async () => {
    try {
      const articles = await articlesServices.getAllArticles();

      setAllArticles(articles);
      setFilterArticle(articles.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      loadLatestArticles();
    }
  }, [user]);

  const onLoadMoreArticles = () => {
    setFilterArticle(allArticles);
    setQuery("");
  };

  useEffect(() => {
    const search = async () => {
      try {
        if (query.trim()) {
          const search = await articlesServices.searchArticles(query);
          console.log("data", search.data);
          setFilterArticle(search.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    search();
  }, [query]);

  return (
    <div className="text-white home-background">
      {/* setQuery(e.target.value) */}

      <PageHeader
        title={"The Blog"}
        description="Your destination for the latest news,articles insights across a wide range of topics"
      />
      <div className="d-flex justify-content-center gap-2  w-75">
        <button className=" fs-4" onClick={onLoadMoreArticles}>
          All Articles
        </button>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <div className="card-glass-container">
        {filterArticles.map((article) => {
          return <ArticleCard article={article} key={article.id} />;
        })}
      </div>
    </div>
  );
}

export default Home;
