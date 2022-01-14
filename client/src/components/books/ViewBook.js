import "./books.css";
import React, { useState, useEffect } from "react";
import { Box, Fade, Typography, Divider, Link } from "@mui/material";
import { getSomething, methods } from "../../helpers";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

function ViewBook() {
  //helpers
  const { get } = methods;
  const navigate = useNavigate();

  //global state
  const token = sessionStorage.getItem("token");
  const url = window.location.pathname;

  //local state
  const [fade, setFade] = useState(false);
  const [book, setBook] = useState(null);

  //side effects
  useEffect(() => {
    setFade(true);
    getSomething(get, url, {}, token, setBook);
  }, []);

  return (
    <>
      {book ? (
        <Fade in={fade} timeout={{ enter: 500 }}>
          <Box className="View-book">
            <Divider textAlign="left" className="main-divider">
              <Typography>{book.book.title}</Typography>
            </Divider>

            <img
              width="250px"
              height="300px"
              style={{ objectFit: "cover", marginBottom: "30px" }}
              src={`http://localhost:5000/images/books/${book.book.image}`}
              alt={book.book.image}
            ></img>

            <Typography variant="h4">id: </Typography>
            <Typography gutterBottom>{book.book._id}</Typography>

            <Typography variant="h4">Price: </Typography>
            <Typography gutterBottom>{book.book.price} $</Typography>

            <Typography variant="h4">Pages: </Typography>
            <Typography gutterBottom>{book.book.pages}</Typography>

            <Typography variant="h4">{book.authors.length > 1 ? "Authors" : "Author"} </Typography>
            {book.authors.map((author, index) => {
              return author.isDeleted ? (
                <Typography key={author._id} gutterBottom>
                  {author.name}
                </Typography>
              ) : (
                <Link
                  sx={{ cursor: "pointer", mb: 2 }}
                  onClick={() => {
                    navigate(`/authors/${author._id}`);
                  }}
                >
                  {author.name}
                </Link>
              );
            })}

            <Typography variant="h4">Publisher: </Typography>
            {book.book.publisher.isDeleted ? (
              <Typography gutterBottom>{book.book.publisher.name}</Typography>
            ) : (
              <Link
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/publishers/${book.book.publisher._id}`);
                }}
                gutterBottom
              >
                {book.book.publisher.name}
              </Link>
            )}

            <Typography variant="h4">Description: </Typography>
            <Typography gutterBottom>{book.book.description}</Typography>
          </Box>
        </Fade>
      ) : (
        <Loader message={"Something went wrong"} timeout={5000} />
      )}
    </>
  );
}

export default ViewBook;
