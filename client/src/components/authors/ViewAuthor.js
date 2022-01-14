import "./authors.css";
import React, { useState, useEffect } from "react";
import { Box, Fade, Typography, Link, Divider } from "@mui/material";
import { getSomething, methods } from "../../helpers";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import moment from "moment";

function ViewAuthor() {
  //helpers
  const navigate = useNavigate();
  const { get } = methods;

  //global state
  const token = sessionStorage.getItem("token");
  const url = window.location.pathname;

  //local state
  const [fade, setFade] = useState(false);
  const [author, setAuthor] = useState(null);

  //side effects
  useEffect(() => {
    setFade(true);
    getSomething(get, url, {}, token, setAuthor);
  }, []);

  return (
    <>
      {author ? (
        <Fade in={fade} timeout={{ enter: 500 }}>
          <Box className="View-author">
            <Divider textAlign="left" className="main-divider">
              <Typography> {author.name}</Typography>
            </Divider>

            <img
              src={`http://localhost:5000/images/authors/${author.image}`}
              width="250px"
              height="300px"
              style={{ objectFit: "cover", marginBottom: "20px" }}
              alt={author.image}
            ></img>

            <Typography variant="h4">id: </Typography>
            <Typography gutterBottom>{author._id}</Typography>

            <Typography variant="h4">Email: </Typography>
            <Typography gutterBottom>{author.email}</Typography>

            <Typography variant="h4">Birthday:</Typography>
            <Typography gutterBottom>{moment(author.birthday).format("DD.MM.YYYY.")}</Typography>

            <Typography variant="h4">Biography: </Typography>
            <Typography gutterBottom>{author.biography}</Typography>
            <Typography variant="h4">Books:</Typography>
            {author.books.map((book, index) => {
              return book.isDeleted ? (
                <div key={book._id}>
                  <Typography>{book.title}</Typography>
                </div>
              ) : (
                <div key={book._id}>
                  <Link
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/books/${book._id}`);
                    }}
                  >
                    {book.title}
                  </Link>
                  <br></br>
                </div>
              );
            })}
          </Box>
        </Fade>
      ) : (
        <Loader message={"Something went wrong"} timeout={5000} />
      )}
    </>
  );
}

export default ViewAuthor;
