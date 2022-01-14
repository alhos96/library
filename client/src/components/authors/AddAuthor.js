import "./authors.css";
import React, { useState, useEffect } from "react";
import { Box, Button, Fade, IconButton, Typography, Divider } from "@mui/material";
import axios from "axios";
import Remove from "@mui/icons-material/Remove";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import * as yup from "yup";

import { getSomething, methods } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, FieldArray } from "formik";
import { DatePickerField } from "../DatePickerField";

function AddAuthor({ setUrl }) {
  //helpers
  const navigate = useNavigate();
  const { get, post } = methods;
  const url = window.location.pathname;

  //global state
  const token = sessionStorage.getItem("token");

  //local state
  const [fade, setFade] = useState(false);
  const [books, setBooks] = useState([]);
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [showBackdrop, setShowBackdrop] = useState("none");

  //side effects
  useEffect(() => {
    setFade(true);
    getSomething(get, "/books/", {}, token, setBooks);

    //setUrl(window.location.pathname);
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
      <Fade in={fade} timeout={{ enter: 500 }}>
        <Box className="Add-author">
          <Divider textAlign="left" className="main-divider">
            <Typography>Add Author</Typography>
          </Divider>

          {file && <img id="uploaded-image" src={file} alt="uploaded"></img>}

          <Formik
            initialValues={{
              img: "",
              name: "",
              biography: "",
              birthday: "",
              email: "",
              books: [],
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={yup.object({
              img: yup.string().required("Image is required!"),
              name: yup.string().required("Name is required!"),
              biography: yup.string().required("Biography is required!"),
              birthday: yup.string().required("You must add birthday!"),
              email: yup.string().required("You must add email!"),
            })}
            onSubmit={(values) => {
              const newAuthor = new FormData();

              newAuthor.append("img", values.img);
              newAuthor.append("name", values.name);
              newAuthor.append("biography", values.biography);
              newAuthor.append("birthday", values.birthday);
              newAuthor.append("email", values.email);
              newAuthor.append("books", JSON.stringify(values.books));

              axios
                .post(`http://localhost:5000/api${url}`, newAuthor, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                  setMessage("Author created successfully!");
                  setShowBackdrop("block");
                  setTimeout(() => {
                    navigate("/authors");
                  }, 3000);
                });
            }}
          >
            {({ values }) => (
              <Form encType="multipart/form-data">
                <label className="upload-photo" htmlFor="img">
                  {!file && <CameraAltOutlinedIcon color="primary" className="camera-icon" />}
                  <Typography className="upload-photo-title" variant="body2" color="primary">
                    {!file ? "Upload Photo. Photo is required." : "Choose Different?"}
                  </Typography>

                  <input
                    style={{ display: "none" }}
                    onChange={(e) => {
                      setFile(URL.createObjectURL(e.target.files[0]));
                      values.img = e.target.files[0];
                    }}
                    id="img"
                    type="file"
                    name="img"
                  />
                </label>
                <br></br>

                <label htmlFor="name">Name:</label>
                <Field name="name" type="text" className="text-input" />

                <label htmlFor="biography">Biography:</label>
                <Field name="biography" type="text" className="text-input" />

                <label htmlFor="birthday">Birthday:</label>
                <div className="pick-date-wrapp">
                  <CalendarTodayIcon className="field-adornment-icon calendar-icon" />
                  <DatePickerField name="birthday" />
                </div>

                <label htmlFor="email">Email:</label>
                <Field name="email" type="email" className="text-input" />

                <label htmlFor="books">Books:</label>
                <FieldArray
                  name="books"
                  render={(arrayHelpers) => (
                    <div className="field-array-wrapp">
                      <select
                        onChange={(e) => {
                          //prevents adding same book multiple times
                          !arrayHelpers.form.values.books.some((item) => item.title === JSON.parse(e.target.value).title) &&
                            arrayHelpers.push(JSON.parse(e.target.value));
                        }}
                        name="books"
                        style={{ display: "block" }}
                      >
                        <option value="" label="Select a book" />
                        {books.map((book) => (
                          <option key={book._id} value={JSON.stringify({ title: book.title, id: book._id })} label={book.title} />
                        ))}
                      </select>

                      {values.books && values.books.length > 0 ? (
                        values.books.map((book, index) => (
                          <div className="field-array" key={index}>
                            <Field className="field-array-input" value={book.title} name={`books.${[index].title}`} />

                            <IconButton
                              type="button"
                              onClick={() => arrayHelpers.remove(index)} //remove a book from the list
                            >
                              <Remove />
                            </IconButton>
                          </div>
                        ))
                      ) : (
                        <Typography>Add books...</Typography>
                      )}
                    </div>
                  )}
                  type="select"
                  className="text-input"
                />

                <Typography>{message}</Typography>
                <Button variant="contained" disableElevation type="submit" children="save" fullWidth className="button" disabled={!file} />

                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  children="cancel"
                  fullWidth
                  className="button"
                  onClick={() => {
                    navigate("/authors");
                  }}
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Fade>
    </>
  );
}

export default AddAuthor;
