import httpService from "./httpServices";

async function getAllComments(id){
    try {
        const response = await httpService.get(`/articles/${id}/comments`)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

async function createComment(id){
    try {
        const response = await httpService.post(`/articles/${id}/comments`)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

async function deleteComment(id){
    try {
        const response = await httpService.delete(`/articles/${id}/`)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

async function updateComment(id){
    try {
        const response = await httpService.put(`/articles/${id}/`)
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