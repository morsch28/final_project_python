import { useEffect, useState } from "react";
import articlesServices from "../services/articlesServices";
import ArticleCard from "../component/articles/ArticleCard";
import { mockArticles } from "../mocks/mockData";

function Home() {
  const [articles,setArticles]  = useState([])
 

  useEffect(()=>{
    const loadLatestArticles = async () =>{
      try {
        // const allArticles = await articlesServices.getAllArticles()
        // console.log(allArticles)
        const latest = []
        for(let i=0; i<3 && i< mockArticles.length; i++){
          latest.push(mockArticles[i])
        }
        setArticles(latest)   
      } catch (error) {
        console.log(error);   
      }
    }
    loadLatestArticles()
  },[])

  
 

  return (
  <div className="card-3d-container d-flex mt-5 justify-content-center align-items center">
    {articles.map((article)=> {
      return <ArticleCard article={article} key={article.id}/>
    })}
    
  </div>
  );
}

export default Home;
