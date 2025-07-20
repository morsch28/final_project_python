import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Joi from "joi";
import commentsServices from "../../services/commentServices";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { Button } from "bootstrap";

function CommentForm() {
  const [comments, setComments] = useState([]);
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    const loadComments = async (id) => {
      const allComments = await commentsServices.getAllComments(id);
      console.log("allComments", allComments);

      setComments(allComments.data);
    };
    loadComments(id);
  }, [id]);

  const { handleSubmit, getFieldProps, touched, isValid, errors } = useFormik({
    initialValues: {
      text: "",
    },
    validate(values) {
      const schema = Joi.object({
        text: Joi.string().min(1).max(200).required(),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }
      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = error.message;
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        console.log("Sending comment:", values);
        const newComment = await commentsServices.createComment(id, values);
        setComments([...comments, newComment.data]);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const getFistLetter = (name) => {
    if (!name) {
      return null;
    }
    return name[0].toUpperCase();
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <form
        className="d-flex flex-column gap-3 border border-2 w-75 p-3 mb-4 rounded-2 align-items-center cardsShadow bg-white"
        onSubmit={handleSubmit}
      >
        <h3>
          Add Comment <i className="bi bi-chat"></i>
        </h3>
        <input
          className="form-control commentText p-2"
          type="text"
          placeholder="Write your comment here"
          {...getFieldProps("text")}
        />
        <input
          type="submit"
          className="w-50 p-2 btn btn-primary"
          disabled={!isValid}
        />
      </form>
      <div className="d-flex flex-column gap-2 w-100 align-items-center mb-5">
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div
                className="d-flex border w-75 gap-4 p-3 cardsShadow bg-white justify-content-between"
                key={comment.id}
              >
                <div className="d-flex gap-3">
                  <div className="avatar p-4">
                    {getFistLetter(comment.author_username)}
                  </div>
                  <div className="d-flex flex-column">
                    <div className="d-flex gap-3 fs-5">
                      <p className="fw-bold">{comment.author_username}</p>
                      <p>{comment.created_at}</p>
                    </div>
                    <p className="fs-5">{comment.text}</p>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  {comment.is_owner && (
                    <>
                      <button
                        style={{ height: "60px", width: "60px" }}
                        className="bg-danger rounded-5"
                      >
                        <i className="bi bi-trash fs-5 text-white"></i>
                      </button>
                      <button
                        style={{ height: "60px", width: "60px" }}
                        className="bg-success rounded-5"
                      >
                        <i className="bi bi-pencil text-white"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default CommentForm;
