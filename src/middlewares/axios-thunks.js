import axios from 'axios';

const createThunkMiddleware = () => ({ dispatch, getState }) => next => (action) => {
  if (typeof action === 'function') {
    const axiosClient = axios.create({
      baseURL: 'http://0.0.0.0:3000',
      responseType: 'json',
    });

    axiosClient.interceptors.response.use(
      response => response.data,
      error => Promise.reject(error.response),
    );

    return action(dispatch, getState, axiosClient);
  }
  return next(action);
};

const thunkWithAxiosMiddleware = createThunkMiddleware();

export default thunkWithAxiosMiddleware;
