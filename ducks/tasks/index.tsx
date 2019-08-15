import { schema } from "normalizr";
import { combineReducers } from "redux";

import Network from "../network";
import { getFromDatabase, postFromDatabase } from "../../database/requests";

import byId from "./byId";

export type Task = {
  id: string;
  what: string;
  why: string;
  when: string;
  how: string;
  createdAt: string;
  updatedAt: string;
};

const PREFIX = "TASKS";
const { fetchStart, fetchSuccess, fetchFailed, reducer: network } = Network(
  PREFIX
);

export const task = new schema.Entity("tasks");
export const tasks = [task];

export const readTasks = () => dispatch => {
  return getFromDatabase("/tasks", { fetchSuccess, fetchFailed, fetchStart })(
    tasks
  )(dispatch);
};

export const createTask = (payload: {
  what: string;
  why: string;
  how: string;
  when: string;
}) => dispatch => {
  return postFromDatabase(
    "/task",
    { fetchSuccess, fetchFailed, fetchStart },
    payload
  )(tasks)(dispatch);
};

export default combineReducers({ byId, network });
