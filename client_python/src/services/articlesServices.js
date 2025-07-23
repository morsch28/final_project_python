import httpService from "./httpServices";

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

function createArticles(article){
    return httpService.post("/articles/",article)
}

async function updateArticle(id,article){
    try {
        const response = await httpService.put(`/articles/${id}/`,article)
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
    createArticles,
    getAllArticles,
    getArticleById,
    searchArticles
}
export default articlesServices