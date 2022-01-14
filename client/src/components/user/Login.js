import "./user.css";
import { useState, useEffect } from "react";
import { Box, Typography, Button, Divider, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../logo/Logo";
import { userLogin, messageReset } from "../../store/usersSlice";
import { methods } from "../../helpers";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

function Login() {
  //helpers
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = methods;

  //global state
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const error = useSelector((state) => state.users.error);

  //local state
  const [fade, setFade] = useState(false);

  //side effects
  useEffect(() => {
    loggedIn && navigate("/books");
    return () => {
      dispatch(messageReset());
    };
  }, [loggedIn]);

  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <Fade in={fade} timeout={{ enter: 500 }}>
      <Box className="Login">
        <Logo />

        <Divider className="main-divider" textAlign="left">
          <Typography variant="body1">Login</Typography>
        </Divider>

        <Formik
          initialValues={{ username: "", password: "" }}
          validateOnChange={false}
          validateOnBlur={false}
          validationSchema={yup.object({
            username: yup.string("Enter your username").required("Username is requiered"),
            password: yup
              .string("Enter your password")
              .min(5, "Password should be of minimum 8 characters length")
              .required("Password is required"),
          })}
          onSubmit={(values) => {
            dispatch(userLogin("/users/login", values, post));
          }}
        >
          {() => (
            <Form className="login-form">
              <label className="label" htmlFor="username">
                Username:
              </label>
              <Field name="username" type="text" className="text-input" />

              <ErrorMessage className="error" name="username" component="p" />

              <label htmlFor="password">Password:</label>
              <Field name="password" type="password" className="text-input" />
              <ErrorMessage className="error" name="password" component="p" />

              <Typography className="error">{error}</Typography>
              <Button className="button" children="login" type="submit" size="small" variant="contained" fullWidth disableElevation />
            </Form>
          )}
        </Formik>
      </Box>
    </Fade>
  );
}

export default Login;
