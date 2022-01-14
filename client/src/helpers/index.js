import axios from "axios";

export const onSubmit = (e, dispatch, action, url, userInput, method, token) => {
  e.preventDefault();
  dispatch(action(url, userInput, method, token));
};

export const getSomething = (method, url, data, token, setState) => {
  axios({
    method,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    data,
    url: `http://localhost:5000/api${url}`,
  }).then((response) => {
    setState(response.data.data);
  });
};

export const postSomething = (method, url, data, token, setState) => {
  axios({
    method,
    data,
    headers: { Authorization: `Bearer ${token}` },
    url: `http://localhost:5000${url}`,
  }).then((response) => {
    setState(response.data.data);
  });
};

export const methods = {
  get: "GET",
  post: "POST",
  patch: "PATCH",
  put: "PUT",
  remove: "DELETE",
};

export const links = [
  { name: "Authors", path: "/authors" },
  { name: "Books", path: "/books" },
  { name: "Publishers", path: "/publishers" },
];

export const blockInvalidChar = (e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault(); //for number input field, will allow only positive numbers
