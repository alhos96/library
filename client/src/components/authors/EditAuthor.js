import "./authors.css";
import React, { useState, useEffect } from "react";
import { Box, Button, Fade, IconButton, Typography, Divider } from "@mui/material";
import axios from "axios";
import Remove from "@mui/icons-material/Remove";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { getSomething, postSomething, methods } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, FieldArray } from "formik";
import moment from "moment";

function EditAuthor() {
  //helpers
  const navigate = useNavigate();
  const { get } = methods;
  const url = window.location.pathname;

  //global state
  const token = sessionStorage.getItem("token");

  //local state
  const [fade, setFade] = useState(false);
  const [books, setBooks] = useState([]);
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState(null);
  const [showBackdrop, setShowBackdrop] = useState("none");

  //side effects
  useEffect(() => {
    setFade(true);
    getSomething(get, "/books/", {}, token, setBooks);
    getSomething(get, url, {}, token, setAuthor);
  }, []);

  useEffect(() => {
    author && setFile(`http://localhost:5000/images/authors/${author.image}`);
  }, [author]);

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
      {author && (
        <Fade in={fade} timeout={{ enter: 500 }}>
          <Box className="Edit-author">
            <Divider textAlign="left" className="main-divider">
              <Typography>Edit Author</Typography>
            </Divider>
            {file && <img id="uploaded-image" src={file} alt="uploaded"></img>}

            <Formik
              initialValues={{
                img: author.image,
                name: author.name,
                biography: author.biography,
                birthday: author.birthday,
                email: author.email,
                books: author.books,
              }}
              onSubmit={(values) => {
                const newAuthor = new FormData();

                newAuthor.append("img", values.img);
                newAuthor.append("name", values.name);
                newAuthor.append("biography", values.biography);
                newAuthor.append("birthday", values.birthday);
                newAuthor.append("email", values.email);
                newAuthor.append("books", JSON.stringify(values.books));

                //iz nekog razloga ne saljem body

                axios
                  .patch(`http://localhost:5000/api${url}`, newAuthor, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((res) => {
                    setMessage("Author edited successfully!");
                    setShowBackdrop("block");
                    setTimeout(() => {
                      navigate("/authors");
                    }, 3000);
                  });

                console.log(values);
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
                    <input
                      className="text-input"
                      disabled
                      type="text"
                      value={moment(author.birthday).format("DD.MM.YYYY.")}
                      name="birthday"
                    />
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
                          <Typography>Edit books...</Typography>
                        )}
                      </div>
                    )}
                    type="select"
                    className="text-input"
                  />

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
                      navigate("/authors");
                    }}
                  />
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      )}
    </>
  );
}

export default EditAuthor;
