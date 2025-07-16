import { useEffect, useState } from "react"
import articlesServices from "../../services/articlesServices"
import { useParams } from "react-router-dom"


function ArticleCard(){
    const [article,setArticle] = useState({})
    const {id} = useParams()

    useEffect(()=>{
        const loadArticle = async () =>{
            try {
                const _article = await articlesServices.getArticleById(id);
                setArticle(_article.data)
                return article
            } catch (error) {
                
            }
            
        }
        loadArticle()
    },[id])

    return(
        <>
        <div class="card mb-3">
            <img src={article.image} class="card-img-top"  />
            <div class="card-body">
                <h5 class="card-title">{article.title}</h5>
                <p class="card-text">{article.text}</p>
                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
            </div>
        </div>
        <div>
            <h3>Add Comment <i class="bi bi-chat"></i></h3>
            <input type="text" />
            <input type="submit" />
        </div>
        </>
    )
}
export default ArticleCard