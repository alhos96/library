import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import PrivateRoute from "./auth/PrivateRoute";
import {
  Home,
  Navbar,
  Footer,
  OurTeam,
  Login,
  Books,
  Publishers,
  Authors,
  AddAuthor,
  AddPublisher,
  AddBook,
  ViewAuthor,
  ViewBook,
  ViewPublisher,
  EditPublisher,
  EditAuthor,
  EditBook,
} from "./components";

function App() {
  //global state
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const loggedOut = useSelector((state) => state.users.loggedOut);

  //local state
  const [token, setToken] = useState(sessionStorage.getItem("token"));

  //side effects
  useEffect(() => {
    loggedIn && setToken(sessionStorage.getItem("token"));
  }, [loggedIn]);
  useEffect(() => {
    loggedOut && setToken(sessionStorage.getItem(null));
  }, [loggedOut]);

  return (
    <Box className="App">
      <BrowserRouter>
        {token && <Navbar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route
            path="/authors"
            element={
              <PrivateRoute>
                <Authors />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/authors/:id"
            element={
              <PrivateRoute>
                <ViewAuthor />
              </PrivateRoute>
            }
          />
          <Route
            path="/authors/add-author"
            element={
              <PrivateRoute>
                <AddAuthor />
              </PrivateRoute>
            }
          />
          <Route
            path="/authors/edit-author/:id"
            element={
              <PrivateRoute>
                <EditAuthor />
              </PrivateRoute>
            }
          />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <Books />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/add-book"
            element={
              <PrivateRoute>
                <AddBook />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/:id"
            element={
              <PrivateRoute>
                <ViewBook />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/edit-book/:id"
            element={
              <PrivateRoute>
                <EditBook />
              </PrivateRoute>
            }
          />
          <Route
            path="/publishers"
            element={
              <PrivateRoute>
                <Publishers />
              </PrivateRoute>
            }
          />
          <Route
            path="/publishers/add-publisher"
            element={
              <PrivateRoute>
                <AddPublisher />
              </PrivateRoute>
            }
          />
          <Route
            path="/publishers/:id"
            element={
              <PrivateRoute>
                <ViewPublisher />
              </PrivateRoute>
            }
          />{" "}
          <Route
            path="/publishers/edit-publisher/:id"
            element={
              <PrivateRoute>
                <EditPublisher />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </Box>
  );
}

export default App;
