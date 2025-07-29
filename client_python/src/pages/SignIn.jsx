import { useFormik } from "formik";
import userServices from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Input from "../component/common/Input";
import PageHeader from "../component/common/PageHeader";
import image from "../images/b6ba14187_logo.png";
import Joi from "joi";
import feedbackService from "../services/feedbackService";

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { handleSubmit, errors, touched, isValid, getFieldProps } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        username: Joi.string().min(2).max(256).required(),
        password: Joi.string()
          .min(8)
          .max(50)
          .required()
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d))(?=.*[!@#$%^&*-])/)
          .messages({
            "string.pattern.base":
              "Use 8+ chars with A-Z, a-z, number & symbol",
            "string.min": "Password must be at least 8 characters long",
            "string.max": "Password cannot exceed 50 characters",
          }),
      });

      const { error } = schema.validate(values, { abortEarly: false });
      if (!error) {
        return null;
      }
      const errors = {};
      for (const detail of error.details) {
        errors[detail.path[0]] = detail.message;
      }
      return errors;
    },
    onSubmit: async (values) => {
      const response = await login(values);
      if (response.status) {
        await feedbackService
          .showAlert({
            title: `Welcome ${values.username}`,
            text: "You have successfully logged in",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          })
          .then(() => {
            navigate("/");
          });
      } else {
        await feedbackService.showAlert({
          title: `Error: ${response.message}`,
          text: "loggedIn failed.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    },
  });

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-center align-items-center  mt-3  gap-3 border border-2 signIn"
      >
        <img src={image} alt="" className="imageBlog " />
        <PageHeader
          title="Welcome to the blog"
          description="Sign in to continue"
        />
        <div className="d-flex flex-column w-100 gap-1">
          <Input
            placeholder="User Name"
            {...getFieldProps("username")}
            error={touched.username && errors.username}
          />
          <Input
            placeholder="Password"
            {...getFieldProps("password")}
            error={touched.password && errors.password}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-50 p-2 fs-5 mb-2"
          disabled={!isValid}
        >
          Let's Start
        </button>
        <div className="fs-5">
          Need an account? <Link to="/sign-up">Sign up</Link>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
