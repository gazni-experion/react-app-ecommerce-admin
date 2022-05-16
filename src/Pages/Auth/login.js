import { useNavigate } from "react-router-dom";
import "../../Styles/styles.css";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "../../Components/Config/config";
import Loader from "../../Components/Loader/loader";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  passwords: yup
    .string("Enter your password")
    .min(6, "Password should be of minimum 6 characters length")
    .max(15, "Password should be of maximum 15 characters length")
    .required("Password is required"),
});

function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      passwords: "",
    },
    validateOnMount: true,
    validationSchema: validationSchema,

    onSubmit: (values) => {
      setIsLoading(true);
      setIsSubmitting(true);
      console.log(JSON.stringify(values, null, 2));
      axios
        .post(
          "http://localhost/RESTAPI/ecommerce/api/auth/login.php",
          JSON.stringify(values)
        )
        .then(function (response) {
          console.log(response.data);
          console.warn(response.status);
          if (response.data.jwt) {
            localStorage.setItem("token", response.data.jwt);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userName", response.data.userName);
            navigate("/admin/dashboard");
          } else {
            alert("Invalid Credentials Please try again");
            setIsSubmitting(false);
            setIsLoading(false);
          }
        })
        .catch(function (error) {
          console.log(error);
          alert("Invalid Credentials Please try again");
          setIsSubmitting(false);
          setIsLoading(false);
        });
    },
  });

  return (
    <div className="login-form">
      <Loader isLoading={isLoading} />
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email || formik.errors.email}
        />
        <TextField
          fullWidth
          id="passwords"
          name="passwords"
          label="Password"
          type="password"
          value={formik.values.passwords}
          onChange={formik.handleChange}
          error={formik.touched.passwords && Boolean(formik.errors.passwords)}
          helperText={formik.touched.passwords || formik.errors.passwords}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          disabled={!formik.isValid || isSubmitting}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default Login;
