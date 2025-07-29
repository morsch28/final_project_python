import httpService from "./httpServices";
import userServices from "./userServices";

async function getAllComments(id) {
  const response = await httpService.get(`/articles/${id}/comments`);
  return response;
}

async function createComment(id, commentData) {
  const response = await httpService.post(
    `/articles/${id}/comments/`,
    commentData
  );
  return response;
}

async function deleteComment(id) {
  const token = userServices.getJwt();
  const response = await httpService.delete(`/comments/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

async function updateComment(id, commentData) {
  const response = await httpService.put(`/comments/${id}/`, commentData);
  return response;
}

const commentsServices = {
  updateComment,
  deleteComment,
  getAllComments,
  createComment,
};
export default commentsServices;
