import { useFormik } from "formik";
import userServices from "../services/userServices";
import { useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import Input from "../component/common/Input";
import PageHeader from  "../component/common/PageHeader"

function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { handleSubmit, errors, touched, isValid, getFieldProps } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validate(values) {
      const schema = Joi.object({
        userName: Joi.string().min(2).max(256).required(),
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
        if (response.status == 201) {
          await login({ email: values.email, password: values.password });
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-center align-items-center h-75 mt-5 w-25 bg-info-subtle gap-4 border"
    >
      <PageHeader title="Sign Up"/>
      <div className="d-flex flex-column w-100 gap-3">
        <Input
          placeholder="User Name"
          {...getFieldProps("userName")}
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
        className="btn btn-primary w-25 p-2 fs-5 mb-2"
        disabled={!isValid}
      >
        Let's Start
      </button>
    </form>
  );
}

export default SignUp;

