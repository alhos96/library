import "./books.css";
import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, Link, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Zoom } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getSomething, methods } from "../../helpers";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Modal from "../Modal";
import * as yup from "yup";

function Books() {
  //helpers
  const navigate = useNavigate();
  const url = window.location.pathname;
  const { get, post } = methods;

  //global state
  const token = sessionStorage.getItem("token");
  const isAdmin = sessionStorage.getItem("isAdmin");

  //local state
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState("none");
  const [id, setId] = useState("");

  useEffect(() => {
    getSomething(get, url, {}, token, setBooks);
  }, []);
  return (
    <Box className="Books-wrapp">
      <Divider textAlign="left" className="main-divider">
        <Typography>Books</Typography>
      </Divider>

      <Zoom in={showModal === "none" ? false : true}>
        <div className="modal-wrapp" style={{ display: showModal }}>
          <Modal id={id} url={url} token={token} setState={setBooks} setShowModal={setShowModal}></Modal>
        </div>
      </Zoom>

      <Box className="Search-wrapp">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) => getSomething(post, `${url}/find`, values, token, setBooks)}
          validateOnChange
          validationSchema={yup.object({
            search: yup.string().matches(/^[aA-zZ\s]+$/, "Only letters are allowed for this field "),
          })}
        >
          <Form className="search-form-container">
            <Field placeholder="Search" name="search" type="text" className="text-input" required></Field>
            <ErrorMessage className="error" name="search" component="p" />
            <IconButton type="submit" className="field-adornment-icon">
              <Search />
            </IconButton>
          </Form>
        </Formik>
      </Box>

      <Box className="Table-wrapp">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key="No.">No.</TableCell>
              <TableCell key="title">Title</TableCell>
              <TableCell key="pages">Pages</TableCell>
              <TableCell key="price">Price</TableCell>
              <TableCell key="actions">
                {isAdmin && (
                  <Link
                    onClick={() => {
                      navigate("/books/add-book");
                    }}
                    className="link"
                  >
                    Add
                  </Link>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.length > 0 ? (
              books.map((book, index) => {
                return (
                  <TableRow key={book._id}>
                    <TableCell width="5px" align="left">
                      {book._id}
                    </TableCell>
                    <TableCell className="title" align="left">
                      <Link
                        onClick={() => {
                          navigate(`/books/${book._id}`);
                        }}
                        className="link"
                      >
                        {book.title}
                      </Link>
                    </TableCell>
                    <TableCell width="5px" align="left">
                      {book.pages}
                    </TableCell>
                    <TableCell width="5px" align="left">
                      {book.price.toFixed(2)} KM
                    </TableCell>
                    <TableCell width="5px">
                      {isAdmin && (
                        <>
                          <Link
                            className="table-link link"
                            onClick={(e) => navigate(`/books/edit-book/${e.target.id}`)}
                            id={book._id}
                            sx={{ mr: 1 }}
                            size="small"
                          >
                            Edit
                          </Link>
                          <Link
                            className="table-link link"
                            id={book._id}
                            size="small"
                            onClick={(e) => {
                              setShowModal("block");
                              setId(e.target.id);
                            }}
                          >
                            Delete
                          </Link>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <tr>
                <td>
                  <Loader message={"No books in database.."} timeout={5000} />
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default Books;
