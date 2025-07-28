import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import articlesServices from "../services/articlesServices";
import { useAuth } from "../context/authContext";

 export default function useArticle(){
    const [article, setArticle] = useState({});
    const [hasError, setHasError] = useState(false);
    const [isLoading,setIsLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
    const loadArticle = async () => {
      setIsLoading(true)
      try {
        const _article = await articlesServices.getArticleById(id);
        if (!article) {
          setHasError(true);
        }
        setArticle(_article.data);
        return article;
      } catch (error) {
        setHasError(true);
      }finally{
        setIsLoading(false)
      }
    };
    loadArticle();
  }, [id]);
  return {article,hasError,isLoading}
 }