import { useFormik } from "formik";
import Joi from "joi";
import Input from "../common/Input";
import articleServices from "../../services/articlesServices";
import { useNavigate } from "react-router-dom";
import PageHeader from "../common/PageHeader";

function ArticleForm({ article }) {
  const navigate = useNavigate();

  const {
    handleSubmit,
    getFieldProps,
    touched,
    isValid,
    errors,
    setFieldValue,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      author: article?.author || "",
      title: article?.title || "",
      text: article?.text || "",
      content: article?.content || "",
      image_file: null,
      status: article?.status || "published",
    },
    validate(values) {
      const schema = Joi.object({
        author: Joi.string().min(2).max(20).required(),
        title: Joi.string().min(5).max(100).required(),
        text: Joi.string().min(5).required(),
        content: Joi.string().min(10).required(),
        image_file: Joi.any().allow(null).optional(),
        status: Joi.string().valid("published", "draft").required(),
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
      console.log("text");

      try {
        const formData = new FormData();
        formData.append("author", values.author);
        formData.append("title", values.title);
        formData.append("text", values.text);
        formData.append("content", values.content);
        if (values.image_file) {
          formData.append("image_file", values.image_file);
        }
        const response = article
          ? await articleServices.updateArticle(article.id, formData)
          : await articleServices.createArticle(formData);
        if (response.status == 201 || response.status == 200) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const firstError = Object.values(errors)[0];

  return (
    <div className="container d-flex justify-content-center  my-3">
      <form
        className="d-flex flex-column gap-3 border border-2 w-75 p-3 mb-3 rounded-2 align-items-center cardsShadow bg-white "
        onSubmit={handleSubmit}
      >
        {firstError && <div className="alert alert-danger">{firstError}</div>}
        {article ? (
          <PageHeader title="Update Article" />
        ) : (
          <PageHeader title="Create Article" />
        )}
        <Input
          placeholder="author"
          {...getFieldProps("author")}
          error={errors.author && touched.author}
        />
        <Input
          placeholder="title"
          {...getFieldProps("title")}
          error={errors.title && touched.title}
        />

        <Input
          placeholder="text"
          {...getFieldProps("text")}
          error={errors.text && touched.text}
        />
        <Input
          className="contentInput"
          placeholder="content"
          {...getFieldProps("content")}
          error={errors.content && touched.content}
        />
        <input
          className="btn bg-secondary-subtle d-flex fs-5"
          type="file"
          name="image_file"
          onChange={(e) =>
            setFieldValue("image_file", e.currentTarget.files[0])
          }
        />
        <button
          type="submit"
          className="btn btn-primary w-25 my-4 fs-5"
          disabled={!isValid}
        >
          {article ? "update article" : "create article"}
        </button>
      </form>
    </div>
  );
}

export default ArticleForm;
