import { useEffect, useState } from "react";
import commentsServices from "../../services/commentServices";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";

function ShowAllComments({ articleId }) {
  const [commentOnEdit, setCommentOnEdit] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const allComments = await commentsServices.getAllComments(articleId);
      setComments(allComments.data);
    };
    loadComments();
  }, [articleId]);

  const handleDelete = async (commentId) => {
    try {
      const response = await commentsServices.deleteComment(commentId);
      if (response) {
        setComments(comments.filter((com) => com.id != commentId));
      }
      // להוסיף מחווה שגיאה
    } catch (error) {
      //להוסיף מחווה
    }
  };

  const handleEdit = (commentId) => {
    setCommentOnEdit(commentId);
    const editable = document.getElementById(`${commentId}_text`);
    editable.contentEditable = true;
    editable.focus();
  };
  const handleSaveComment = async (comment) => {
    try {
      const updateText = document.getElementById(
        `${comment.id}_text`
      ).innerText;
      await commentsServices.updateComment(comment.id, { text: updateText });
      const updateComments = comments.map((com) => {
        if (com.id == comment.id) {
          return { ...com, text: updateText };
        }
        return com;
      });
      setComments(updateComments);
      setCommentOnEdit(null);
      const newText = document.getElementById(`${comment.id}_text`);
      if (newText) {
        newText.contentEditable = false;
      }
    } catch (error) {
      console.log("update comment failed", error);
    }
  };

  const handleAddComment = async (newComment) => {
    try {
      const response = await commentsServices.createComment(articleId, {
        text: newComment,
      });
      setComments([...comments, response.data]);
    } catch (error) {
      console.log("add comment failed", error);
    }
  };
  return (
    <CommentsList
      onAddComment={handleAddComment}
      onDelete={handleDelete}
      onEdit={handleEdit}
      onSave={handleSaveComment}
      comments={comments}
      commentOnEdit={commentOnEdit}
    />
  );
}

export default ShowAllComments;
