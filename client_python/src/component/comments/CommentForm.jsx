import { useFormik } from "formik";
import Joi from "joi";

function CommentForm({ onSubmit }) {
  const { handleSubmit, getFieldProps, touched, isValid, errors, resetForm } =
    useFormik({
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
          await onSubmit(values.text);
          resetForm();
        } catch (error) {
          console.log(error);
        }
      },
    });
  return (
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
  );
}
export default CommentForm;
