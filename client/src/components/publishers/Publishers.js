import "./publishers.css";
import React, { useEffect, useState } from "react";
import { Box, Divider, Typography, Link, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Zoom } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getSomething, methods } from "../../helpers";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Modal from "../Modal";
import * as yup from "yup";

function Publishers() {
  //helpers
  const navigate = useNavigate();
  const url = window.location.pathname;
  const { get, post } = methods;

  //global state
  const token = sessionStorage.getItem("token");
  const isAdmin = sessionStorage.getItem("isAdmin");

  //local state
  const [publishers, setPublishers] = useState([]);
  const [showModal, setShowModal] = useState("none");
  const [id, setId] = useState("");

  useEffect(() => {
    getSomething(get, url, {}, token, setPublishers);
    return () => {
      setPublishers([]);
    };
  }, []);

  return (
    <Box className="Publishers-wrapp">
      <Divider textAlign="left" className="main-divider">
        <Typography>Publishers</Typography>
      </Divider>

      <Zoom in={showModal === "none" ? false : true}>
        <div className="modal-wrapp" style={{ display: showModal }}>
          <Modal id={id} url={url} token={token} setState={setPublishers} setShowModal={setShowModal}></Modal>
        </div>
      </Zoom>

      <Box className="Search-wrapp">
        <Formik
          initialValues={{ search: "" }}
          onSubmit={(values) => getSomething(post, `${url}/find`, values, token, setPublishers)}
          validateOnChange
          validationSchema={yup.object({
            search: yup.string().matches(/^[aA-zZ\s]+$/, "Only letters are allowed for this field "),
          })}
        >
          {(data) => {
            if (data.values.search === "") {
              getSomething(get, url, {}, token, setPublishers);
            }
            return (
              <Form className="search-form-container">
                <Field id="search" placeholder="Search" name="search" type="search" className="text-input" required></Field>
                <ErrorMessage className="error" name="search" component="p" />
                <IconButton type="submit" className="field-adornment-icon">
                  <Search />
                </IconButton>
              </Form>
            );
          }}
        </Formik>
      </Box>

      <Box className="Table-wrapp">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key="No.">No.</TableCell>
              <TableCell key="name">Name</TableCell>
              <TableCell key="country">Country</TableCell>

              <TableCell key="actions">
                {isAdmin && (
                  <Link
                    onClick={() => {
                      navigate("/publishers/add-publisher");
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
            {publishers.length > 0 ? (
              publishers.map((publisher, index) => {
                return (
                  <TableRow key={publisher._id}>
                    <TableCell width="5px" align="left">
                      {publisher._id}
                    </TableCell>
                    <TableCell align="left">
                      <Link
                        onClick={() => {
                          navigate(`/publishers/${publisher._id}`);
                        }}
                        className="link"
                      >
                        {publisher.name}
                      </Link>
                    </TableCell>
                    <TableCell align="left">{publisher.country.toUpperCase()}</TableCell>

                    <TableCell width="5px">
                      {isAdmin && (
                        <>
                          <Link
                            className="table-link link"
                            onClick={(e) => navigate(`/publishers/edit-publisher/${e.target.id}`)}
                            id={publisher._id}
                            sx={{ mr: 1 }}
                            size="small"
                          >
                            Edit
                          </Link>
                          <Link
                            className="table-link link"
                            id={publisher._id}
                            size="small"
                            onClick={(e) => {
                              setId(e.target.id);
                              setShowModal("block");
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
                  <Loader message={"No publishers in database.."} timeout={5000} />
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
}

export default Publishers;
