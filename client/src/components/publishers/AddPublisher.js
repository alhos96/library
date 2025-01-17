import "./publishers.css";
import React, { useState, useEffect } from "react";
import { Box, Button, Fade, Typography, Divider } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";

function AddPublisher() {
  //helpers
  const navigate = useNavigate();

  //global state
  const token = sessionStorage.getItem("token");
  const url = window.location.pathname;

  //local state
  const [fade, setFade] = useState(false);
  const [message, setMessage] = useState("");
  const [showBackdrop, setShowBackdrop] = useState("none");

  //side effects
  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <>
      <div
        className="backdrop"
        style={{
          height: "100vh",
          width: "100vw",
          display: showBackdrop,
          zIndex: "1",
          position: "absolute",
        }}
      ></div>
      <Fade in={fade} timeout={{ enter: 1000 }}>
        <Box className="Add-publisher">
          <Divider textAlign="left" className="main-divider">
            <Typography>Add Publisher</Typography>
          </Divider>

          <Formik
            initialValues={{
              name: "",
              road: "",
              zipcode: "",
              city: "",
              country: "",
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={yup.object({
              name: yup.string().required("Name is required!"),
              road: yup.string().required("You must add road!"),
              city: yup.string().required("You must add city!"),
              zipcode: yup.string().required("You must add zipcode!"),
              country: yup.string().required("You must add country!"),
            })}
            onSubmit={(values) => {
              axios
                .post(`http://localhost:5000/api${url}`, values, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                  console.log(res);
                  setMessage("Publisher added successfuly!");
                  setShowBackdrop("block");
                  setTimeout(() => {
                    navigate("/publishers");
                  }, 3000);
                })
                .catch((err) => {
                  console.log(err);
                  setMessage("That publisher already exists!");
                });
            }}
          >
            <Form encType="multipart/form-data">
              <label htmlFor="name">Name:</label>
              <Field name="name" type="text" className="text-input" />
              <ErrorMessage className="error" name="name" component="p" />
              <label htmlFor="road">Road:</label>
              <Field name="road" type="text" className="text-input" />
              <ErrorMessage className="error" name="road" component="p" />
              <label htmlFor="zipcode">ZIP Code:</label> <Field name="zipcode" type="text" className="text-input" />
              <ErrorMessage className="error" name="zipcode" component="p" />
              <label htmlFor="city">City:</label> <Field name="city" type="text" className="text-input" />
              <ErrorMessage className="error" name="city" component="p" />
              <label htmlFor="country">Country:</label> <Field name="country" type="text" className="text-input" />
              <ErrorMessage className="error" name="country" component="p" />
              <Typography>{message}</Typography>
              <Button variant="contained" disableElevation type="submit" children="save" fullWidth className="button" />
              <Button
                variant="contained"
                color="secondary"
                disableElevation
                children="cancel"
                fullWidth
                className="button"
                onClick={() => {
                  navigate("/publishers");
                }}
              />
            </Form>
          </Formik>
        </Box>
      </Fade>
    </>
  );
}

export default AddPublisher;
