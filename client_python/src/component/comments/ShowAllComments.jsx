import { useEffect, useState } from "react";
import commentsServices from "../../services/commentServices";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import CommentForm from "./CommentForm";
import CommentsList from "./CommentsList";
import feedbackService from "../../services/feedbackService";

function ShowAllComments({ articleId }) {
  const [commentOnEdit, setCommentOnEdit] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadComments = async () => {
      const allComments = await commentsServices.getAllComments(articleId);
      setComments(allComments.data);
    };
    loadComments();
  }, [articleId]);

  const handleDelete = async (commentId) => {
    try {
      const result = await feedbackService.showConfirm({
        text: "Are you sure you want to delete?",
      });
      if (result.isConfirmed) {
        const response = await commentsServices.deleteComment(commentId);
        if (response) {
          await feedbackService
            .showAlert({
              title: "Ok",
              text: "the comment was deleted successfully",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            })
            .then(() => {
              setComments(comments.filter((com) => com.id != commentId));
            });
        }
      }
    } catch (error) {
      await feedbackService.showAlert({
        title: "Ops..!",
        text: `you have server error ${error}`,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
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
      const result = await feedbackService.showConfirm({
        text: "Are you sure you want to edit the comment?",
      });
      if (result.isConfirmed) {
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
        navigate("/");
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
      if (response) {
        await feedbackService
          .showAlert({
            title: "Ok!",
            text: "the comment wad added successfully",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          })
          .then(() => {
            setComments([...comments, response.data]);
          });
      }
    } catch (error) {
      await feedbackService.showAlert({
        title: "Ops..!",
        text: "failed to add comment",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
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
