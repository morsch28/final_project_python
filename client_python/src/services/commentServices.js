import httpService from "./httpServices";
import userServices from "./userServices"

async function getAllComments(id){
    try {
        const response = await httpService.get(`/articles/${id}/comments`)
        return response
    } catch (error) {
        console.error("Error in getAllComments:", error); 
        throw error;
    }
}

async function createComment(id,commentData){
    try {
        const response = await httpService.post(`/articles/${id}/comments/`,commentData)
        return response
    } catch (error) {
        console.error("Error in create Comment:", error); 
        throw error;
    }
}

async function deleteComment(id){
    try {
         const token = userServices.getJwt()
         const response = await httpService.delete(`/comments/${id}/`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        
        return response
    } catch (error) {
        console.log(error);
        
    }
}

async function updateComment(id,commentData){
    try {
        const response = await httpService.put(`/comments/${id}/`,commentData)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

const commentsServices = {
    updateComment,
    deleteComment,
    getAllComments,
    createComment,
}
export default commentsServices