import useArticle from "../../hooks/useArticle";
import ArticleForm from "../articles/ArticleForm";

function UpdateArticle() {
  const { article, hasError, isLoading } = useArticle();
  if (hasError) {
    return <div>Error loading article</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <ArticleForm article={article} />;
}
export default UpdateArticle;
