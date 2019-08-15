import { normalize } from "normalizr";
import { curry } from "ramda";

export const databaseURL = process.env.REACT_APP_DATABASE_URL || "localhost";
export const databasePort = process.env.REACT_APP_DATABASE_PORT;
export const databaseTLS = process.env.REACT_APP_DATABASE_TLS
  ? "https"
  : "http";

export const URL = `${databaseTLS}://${databaseURL}${
  databasePort ? `:${databasePort}` : ""
}`;

const api = (onRequest, onSuccess, onFailure) =>
  curry((endpoint, network, options, schema, dispatch) => {
    dispatch(network.fetchStart());
    dispatch({ type: onRequest });

    return fetch(`${URL}${endpoint}`, options)
      .then(response => response.json())
      .then(response => {
        dispatch(network.fetchSuccess());

        return dispatch({
          type: onSuccess,
          payload: normalize(response, schema)
        });
      })
      .catch(error => {
        dispatch(network.fetchFailed());
        return dispatch({
          type: onFailure,
          payload: error
        });
      });
  });

const PREFIX = "API";

export const GET_REQUEST = `${PREFIX}/GET_REQUEST`;
export const GET_SUCCESS = `${PREFIX}/GET_SUCCESS`;
export const GET_FAILURE = `${PREFIX}/GET_FAILURE`;
const get = api(GET_REQUEST, GET_SUCCESS, GET_FAILURE);

export const getFromDatabase = (
  endpoint: string,
  network: {
    fetchFailed: (payload: Array<any>) => { type: string; payload: Array<any> };
    fetchStart: () => { type: string };
    fetchSuccess: () => { type: string };
  }
) => get(endpoint)(network)({});

export const POST_REQUEST = `${PREFIX}/POST_REQUEST`;
export const POST_SUCCESS = `${PREFIX}/POST_SUCCESS`;
export const POST_FAILURE = `${PREFIX}/POST_FAILURE`;
const post = api(POST_REQUEST, POST_SUCCESS, POST_FAILURE);

export const postFromDatabase = (
  endpoint: string,
  network: {
    fetchFailed: (payload: Array<any>) => { type: string; payload: Array<any> };
    fetchStart: () => { type: string };
    fetchSuccess: () => { type: string };
  },
  payload: { [key: string]: any }
) =>
  post(endpoint)(network)({
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

export const updateFromDatabase = () => {};

export const deleteFromDatabase = () => {};
