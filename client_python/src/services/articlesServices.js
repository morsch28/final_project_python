import httpService from "./httpServices";
import userServices from "./userServices"
 


async function getAllArticles(){
    try {
        const response = await httpService.get("/articles/")
        return response.data
    } catch (error) {
        console.log(error);   
    }
}

async function searchArticles(query){
    try {
       const response = await httpService.get(`/articles/?search=${query}`) 
       return response
    } catch (error) {
        console.log(error);
        
    }
}

async function getArticleById(id){
    try{
        const response = await httpService.get(`/articles/${id}/`)
        return response
    }catch(error){
        console.log(error);
   
    }
}

function createArticle(article){
    return httpService.post("/articles/",article,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
}

async function updateArticle(id,article){
    try {
        const response = await httpService.put(`/articles/${id}/`,article,{
        headers:{
            "Content-Type": "multipart/form-data",
        }
    })
        return response
    } catch (error) {
        console.log(error);
        
    }
}

async function deleteArticle(id){
    try {
        const response = await httpService.delete(`/articles/${id}/`)
        
        return response
    } catch (error) {
        console.log(error);
        
    }
}

const articlesServices = {
    deleteArticle,
    updateArticle,
    createArticle,
    getAllArticles,
    getArticleById,
    searchArticles
}
export default articlesServices