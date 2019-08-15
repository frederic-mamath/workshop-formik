import { merge, path } from "ramda";

import { GET_SUCCESS, POST_SUCCESS } from "../../database/requests";

type State = {};

type Action = {
  type: string;
  payload: {};
};

const defaultState = {};

export default (state: State = defaultState, action: Action) => {
  switch (action.type) {
    case POST_SUCCESS:
    case GET_SUCCESS:
      return merge(path(["payload", "entities", "tasks"], action), state);
    default:
      return state;
  }
};
