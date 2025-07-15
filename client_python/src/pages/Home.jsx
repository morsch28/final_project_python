import { useEffect, useState } from "react";
import articlesServices from "../services/articlesServices";
import ArticleCard from "../component/articles/ArticleCard";
import PageHeader from "../component/common/PageHeader"
import Input from  "../component/common/Input"


function Home() {
  const [allArticles,setAllArticles]  = useState([])
  const [filterArticles,setFilterArticle] = useState([])
  const [error,setError] = useState(false)
  const [query,setQuery] = useState("")
 

  useEffect(()=>{
    const loadLatestArticles = async () =>{
      try {
        const articles = await articlesServices.getAllArticles()
        setAllArticles(articles)
        setFilterArticle(articles.slice(0,3))    
      } catch (error) {
        console.log(error);   
      }
    }
    loadLatestArticles()
  },[])

  const onLoad = async() =>{
    try {
      console.log("Button clicked, query:", query);
      if(query.trim()){
  
        const search =  await articlesServices.searchArticles(query)
        console.log(search);
        
        setFilterArticle(search)
      }else{
        setFilterArticle(allArticles)
      }
    } catch (error) {
      console.log(error);
      
    }
  }
 

  return (
  <div className="text-white">
    <PageHeader title={'The Blog'} description="Your destination for the latest news,articles insights across a wide range of topics" />
    <div className="d-flex">
      <button className=" fs-4" onClick={onLoad}>All Articles</button>
      <input className="form-control" value={query} onChange={(e)=> {console.log("typing:", e.target.value); setQuery(e.target.value)}} />
    </div>
    <div className="card-3d-container d-flex mt-5 justify-content-center align-items center">
      {filterArticles.map((article)=> {
        return <ArticleCard article={article} key={article.id}/>
      })}   
    </div>
  </div>
  );
}

export default Home;
