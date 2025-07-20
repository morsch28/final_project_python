import { useFormik } from "formik";
import userServices from "../services/userServices";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Input from "../component/common/Input";
import PageHeader from "../component/common/PageHeader";
import image from "../images/b6ba14187_logo.png";
import Joi from "joi";

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
          .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*(\d))(?=.*[!@#$%^&*-])/),
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
      try {
        const response = await login(values);
        if (response.status == 200) {
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column justify-content-center align-items-center  mt-5   gap-4 border border-2 signIn"
      >
        <img src={image} alt="" className="imageBlog mt-4" />
        <PageHeader
          title="Welcome to the blog"
          description="Sign in to continue"
        />
        <div className="d-flex flex-column w-100 gap-2">
          <Input
            placeholder="User Name"
            {...getFieldProps("username")}
            error={touched.last && errors.username}
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
