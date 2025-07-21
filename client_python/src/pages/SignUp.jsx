import { useFormik } from "formik";
import userServices from "../services/userServices";
import { Link, useNavigate } from "react-router";
import Input from "../component/common/Input";
import PageHeader from "../component/common/PageHeader";
import Joi from "joi";

function SignUp() {
  const navigate = useNavigate();

  const { handleSubmit, errors, touched, isValid, getFieldProps } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        username: Joi.string().min(2).max(256).required(),
        email: Joi.string().min(5).max(256).email({ tlds: false }).required(),
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
        const response = await userServices.createUser(values);
        console.log("response", response);
        if (response.status == 201) {
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
        className="d-flex flex-column justify-content-center align-items-center p-5 mt-3  gap-4 border signUp"
      >
        <Link to="/sign-in" className="backSignIn">
          <i class="bi bi-arrow-left"></i>
          Back to sign in
        </Link>
        <PageHeader title="Sign Up" description="create your account" />
        <div className="d-flex flex-column w-100 gap-3">
          <Input
            placeholder="User Name"
            {...getFieldProps("username")}
            error={touched.last && errors.last}
          />
          <Input
            placeholder="Email"
            {...getFieldProps("email")}
            error={touched.email && errors.email}
          />
          <Input
            placeholder="Password"
            {...getFieldProps("password")}
            error={touched.password && errors.password}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-50 p-2 fs-5 mb-4"
          disabled={!isValid}
        >
          Let's Start
        </button>
      </form>
    </div>
  );
}

export default SignUp;
