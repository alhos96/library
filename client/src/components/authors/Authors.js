import "./authors.css";
import React, { useState, useEffect } from "react";
import { Box, Divider, Typography, Link, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Fade, Zoom } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { getSomething, methods } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Loader from "../Loader";
import Modal from "../Modal";
import moment from "moment";
function Authors() {
  //helpers
  const navigate = useNavigate();
  const url = window.location.pathname;
  const { get, post, patch } = methods;

  //global state
  const token = sessionStorage.getItem("token");
  const isAdmin = sessionStorage.getItem("isAdmin");

  //local state
  const [authors, setAuthors] = useState([]);
  const [fade, setFade] = useState(false);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState("none");
  const [id, setId] = useState("");

  useEffect(() => {
    setFade(true);
    getSomething(get, url, {}, token, setAuthors);
  }, []);

  return (
    <Fade in={fade} timeout={{ enter: 500 }}>
      <Box className="Authors-wrapp">
        <Divider textAlign="left" className="main-divider">
          <Typography>Authors</Typography>
        </Divider>

        <Zoom in={showModal === "none" ? false : true}>
          <div className="modal-wrapp" style={{ display: showModal }}>
            <Modal id={id} url={url} token={token} setState={setAuthors} setShowModal={setShowModal}></Modal>
          </div>
        </Zoom>

        <Box className="Search-wrapp">
          <Formik
            initialValues={{ search: "" }}
            onSubmit={(values) => getSomething(post, `${url}/find`, values, token, setAuthors)}
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
                <TableCell key="image">Image</TableCell>

                <TableCell key="name">Name</TableCell>
                <TableCell key="birthday">Birthday</TableCell>
                <TableCell key="email">Email</TableCell>

                <TableCell key="actions">
                  {isAdmin && (
                    <Link
                      onClick={() => {
                        navigate("/authors/add-author");
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
              {authors.length > 0 ? (
                authors.map((author, index) => {
                  return (
                    <TableRow key={author._id}>
                      <TableCell width="5px" align="left">
                        {author._id}
                      </TableCell>
                      <TableCell align="left">
                        <img
                          className="small-author-image"
                          width="50px"
                          height="50px"
                          src={`http://localhost:5000/images/authors/${author.image}`}
                        ></img>
                      </TableCell>
                      <TableCell align="left">
                        <Link
                          onClick={() => {
                            navigate(`/authors/${author._id}`);
                          }}
                          className="link"
                        >
                          {author.name}
                        </Link>
                      </TableCell>
                      <TableCell width="5px" align="left">
                        {moment(author.birthday).format("DD.MM.YYYY.")}
                      </TableCell>
                      <TableCell width="5px" align="left">
                        {author.email}
                      </TableCell>

                      <TableCell width="5px">
                        {isAdmin && (
                          <>
                            <Link
                              className="table-link link"
                              onClick={(e) => navigate(`/authors/edit-author/${e.target.id}`)}
                              id={author._id}
                              sx={{ mr: 1 }}
                              size="small"
                            >
                              Edit
                            </Link>
                            <Link
                              className="table-link link"
                              id={author._id}
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
                    <Loader message={"No authors in database.."} timeout={5000} />
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Fade>
  );
}

export default Authors;
