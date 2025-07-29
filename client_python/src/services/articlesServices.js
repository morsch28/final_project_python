import httpService from "./httpServices";
import userServices from "./userServices";

async function getAllArticles() {
  const response = await httpService.get("/articles/");
  return response.data;
}

async function searchArticles(query) {
  const response = await httpService.get(`/articles/?search=${query}`);
  return response;
}

async function getArticleById(id) {
  const response = await httpService.get(`/articles/${id}/`);
  return response;
}

function createArticle(article) {
  return httpService.post("/articles/", article, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

async function updateArticle(id, article) {
  const response = await httpService.put(`/articles/${id}/`, article, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
}

async function deleteArticle(id) {
  const response = await httpService.delete(`/articles/${id}/`);

  return response;
}

const articlesServices = {
  deleteArticle,
  updateArticle,
  createArticle,
  getAllArticles,
  getArticleById,
  searchArticles,
};
export default articlesServices;
