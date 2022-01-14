import "./publishers.css";
import React, { useState, useEffect } from "react";
import { Box, Fade, Typography, Divider, Link } from "@mui/material";
import { getSomething, methods } from "../../helpers";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

function ViewPublisher() {
  //helpers
  const navigate = useNavigate();
  const { get } = methods;

  //global state
  const token = sessionStorage.getItem("token");
  const url = window.location.pathname;

  //local state
  const [fade, setFade] = useState(false);
  const [publisher, setPublisher] = useState(null);

  //side effects
  useEffect(() => {
    setFade(true);
    getSomething(get, url, {}, token, setPublisher);
  }, []);

  return (
    <>
      {publisher ? (
        <Fade in={fade} timeout={{ enter: 500 }}>
          <Box className="View-publisher">
            <Divider textAlign="left" className="main-divider">
              <Typography>{publisher.publisher.name}</Typography>
            </Divider>

            <Typography variant="h4">id: </Typography>
            <Typography gutterBottom>{publisher.publisher._id}</Typography>

            <Typography variant="h4">Road: </Typography>
            <Typography gutterBottom>{publisher.publisher.road}</Typography>

            <Typography variant="h4">ZIP code:</Typography>
            <Typography gutterBottom>{publisher.publisher.zipcode}</Typography>

            <Typography variant="h4">City: </Typography>
            <Typography gutterBottom>{publisher.publisher.city}</Typography>

            <Typography variant="h4">Country:</Typography>
            <Typography gutterBottom>{publisher.publisher.country}</Typography>

            <Typography variant="h4">Books:</Typography>
            {publisher.books.length > 0 &&
              publisher.books.map((book, index) => {
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

export default ViewPublisher;
