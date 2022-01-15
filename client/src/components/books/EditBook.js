import "./books.css";
import React, { useState, useEffect } from "react";
import { Box, Button, Fade, IconButton, Typography, Divider } from "@mui/material";
import axios from "axios";
import Remove from "@mui/icons-material/Remove";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { getSomething, methods } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import * as yup from "yup";

function EditBook() {
  //helpers
  const navigate = useNavigate();
  const { get } = methods;
  const url = window.location.pathname;

  //global state
  const token = sessionStorage.getItem("token");

  //local state
  const [fade, setFade] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [book, setBook] = useState(null);
  const [file, setFile] = useState("");
  const [showBackdrop, setShowBackdrop] = useState("none");
  const [message, setMessage] = useState("");

  //side effects
  useEffect(() => {
    setFade(true);
    getSomething(get, url, {}, token, setBook);
    getSomething(get, "/authors/", {}, token, setAuthors);
    getSomething(get, "/publishers/", {}, token, setPublishers);
  }, []);

  useEffect(() => {
    book && setFile(`http://localhost:5000/images/books/${book.book.image}`);
  }, [book]);

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
      {book && (
        <Fade in={fade} timeout={{ enter: 500 }}>
          <Box className="Edit-book">
            <Divider textAlign="left" className="main-divider">
              <Typography>Edit Book</Typography>
            </Divider>
            {file && <img id="uploaded-image" src={file} alt="uploaded"></img>}

            <Formik
              initialValues={{
                img: book.book.image,
                title: book.book.title,
                description: book.book.description,
                price: book.book.price,
                pages: book.book.pages,
                authors: book.authors,
                publishers: [book.book.publisher],
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={yup.object({
                img: yup.string().required("Image is required!"),
                title: yup.string().required("title is required!"),
                description: yup.string().required("description is required!"),
                price: yup.string().required("You must add price!"),
                pages: yup.string().required("You must add number of pages!"),
                publishers: yup.array().length(1, "Book must have a publisher"),
                authors: yup.array().length(1, "Book must have at least one author!"),
              })}
              onSubmit={(values) => {
                const newBook = new FormData();

                newBook.append("img", values.img);
                newBook.append("title", values.title);
                newBook.append("description", values.description);
                newBook.append("price", values.price);
                newBook.append("pages", values.pages);
                newBook.append("authors", JSON.stringify(values.authors));
                newBook.append("publishers", JSON.stringify(values.publishers));

                axios
                  .patch(`http://localhost:5000/api${url}`, newBook, {
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  .then((res) => {
                    setMessage("Book edited successfully!");
                    setShowBackdrop("block");
                    setTimeout(() => {
                      navigate("/books");
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

                  <label htmlFor="title">Title:</label>
                  <Field name="title" type="text" className="text-input" />
                  <ErrorMessage className="error" name="title" component="p" />

                  <label htmlFor="description">Description:</label>
                  <Field name="description" type="text" className="text-input" />
                  <ErrorMessage className="error" name="description" component="p" />

                  <label htmlFor="price">Price:</label>
                  <Field name="price" type="text" className="text-input" />
                  <ErrorMessage className="error" name="price" component="p" />

                  <label htmlFor="pages">Pages:</label>
                  <Field name="pages" type="number" className="text-input" />
                  <ErrorMessage className="error" name="pages" component="p" />

                  <label htmlFor="books">Authors:</label>
                  <FieldArray
                    name="authors"
                    render={(arrayHelpers) => (
                      <div className="field-array-wrapp">
                        <select
                          onChange={(e) => {
                            //prevents adding same book multiple times
                            !arrayHelpers.form.values.authors.some((item) => item.name === JSON.parse(e.target.value).name) &&
                              arrayHelpers.push(JSON.parse(e.target.value));
                          }}
                          name="authors"
                          style={{ display: "block" }}
                        >
                          <option value="" label="Select author" />
                          {authors.map((author) => (
                            <option key={author._id} value={JSON.stringify({ name: author.name, id: author._id })} label={author.name} />
                          ))}
                        </select>

                        {values.authors && values.authors.length > 0 ? (
                          values.authors.map((author, index) => (
                            <div className="field-array" key={index}>
                              <Field className="field-array-input" value={author.name} name={`authors.${[index].name}`} />

                              <IconButton
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} //remove a author from the list
                              >
                                <Remove />
                              </IconButton>
                            </div>
                          ))
                        ) : (
                          <Typography>Edit authors...</Typography>
                        )}
                      </div>
                    )}
                    type="select"
                    className="text-input"
                  />
                  <ErrorMessage className="error" name="authors" component="p" />

                  <label htmlFor="books">Publisher:</label>
                  <FieldArray
                    name="publishers"
                    render={(arrayHelpers) => (
                      <div className="field-array-wrapp">
                        <select
                          onChange={(e) => {
                            arrayHelpers.form.values.publishers.length < 1 && arrayHelpers.push(JSON.parse(e.target.value));
                          }}
                          name="publishers"
                          style={{ display: "block" }}
                        >
                          <option value="" label="Select publisher" />
                          {publishers.map((publisher) => (
                            <option
                              key={publisher._id}
                              value={JSON.stringify({ name: publisher.name, id: publisher._id })}
                              label={publisher.name}
                            />
                          ))}
                        </select>
                        {values.publishers && values.publishers.length > 0 ? (
                          values.publishers.map((publisher, index) => (
                            <div className="field-array" key={index}>
                              <Field className="field-array-input" value={publisher.name} name={`publishers.${[index].name}`} />

                              <IconButton
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} //remove publisher from the list
                              >
                                <Remove />
                              </IconButton>
                            </div>
                          ))
                        ) : (
                          <Typography>Edit publisher...</Typography>
                        )}
                      </div>
                    )}
                    type="select"
                    className="text-input"
                  />
                  <ErrorMessage className="error" name="publishers" component="p" />

                  <Typography>{message}</Typography>
                  <Button
                    variant="contained"
                    disableElevation
                    type="submit"
                    children="save"
                    fullWidth
                    className="button"
                    disabled={!file}
                  />

                  <Button
                    variant="contained"
                    color="secondary"
                    disableElevation
                    children="cancel"
                    fullWidth
                    className="button"
                    onClick={() => {
                      navigate("/books");
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

export default EditBook;
