import axios from "axios";
import { apiRequestStarted } from "../actions";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    // if action that was dispatched is not api call, keep going
    if (action.type !== apiRequestStarted.type) {
      return next(action);
    }

    const { url, values, method, token, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:5000",
        url,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        data: values,
        method,
      });

      //dispatch whatever action is ment to happen on successfull call
      onSuccess && dispatch({ type: onSuccess, payload: { data: response.data } });
    } catch (error) {
      //dispatch whatever action is ment to happen on unsuccessfull call
      dispatch({ type: onError, payload: error.response.data.message });
    }
  };

export default api;
