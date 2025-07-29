import { useAuth } from "../../context/authContext";
import CommentForm from "./CommentForm";

function CommentsList({
  comments,
  onDelete,
  onEdit,
  onSave,
  onAddComment,
  commentOnEdit,
}) {
  const { user } = useAuth();

  const getFirstLetter = (name) => {
    if (!name) {
      return null;
    }
    return name[0].toUpperCase();
  };

  return (
    <div className="w-100 d-flex flex-column align-items-center">
      <CommentForm onSubmit={onAddComment} />
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
                    {getFirstLetter(comment.author_username)}
                  </div>
                  <div className="d-flex flex-column">
                    <div className="d-flex gap-3 fs-5">
                      <p className="fw-bold">{comment.author_username}</p>
                      <p>{comment.created_at}</p>
                    </div>
                    <p className="fs-5" id={`${comment.id}_text`}>
                      {comment.text}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  {(comment.is_owner || user?.isAdmin) && (
                    <>
                      {/* delete button */}
                      <button
                        onClick={() => onDelete(comment.id)}
                        style={{ height: "60px", width: "60px" }}
                        className="bg-danger rounded-5"
                      >
                        <i className="bi bi-trash fs-5 text-white"></i>
                      </button>
                      {/* edit button */}
                      <button
                        onClick={() => onEdit(comment.id)}
                        style={{ height: "60px", width: "60px" }}
                        className="bg-success rounded-5"
                      >
                        <i className="bi bi-pencil text-white"></i>
                      </button>
                      {/* save button */}
                      {commentOnEdit == comment.id && (
                        <button
                          className="bg-info rounded-5"
                          style={{ height: "60px", width: "60px" }}
                          onClick={() => onSave(comment)}
                        >
                          <i className="bi bi-save"></i>
                        </button>
                      )}
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
export default CommentsList;
