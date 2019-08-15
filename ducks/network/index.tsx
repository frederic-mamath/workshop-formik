import { concat, pathOr } from "ramda";

const PREFIX = "/NETWORK";

const FETCH_REQUEST = `${PREFIX}/FETCH_REQUEST`;
const FETCH_SUCCESS = `${PREFIX}/FETCH_SUCCESS`;
const FETCH_FAILURE = `${PREFIX}/FETCH_FAILURE`;

const STATUS_SUCCESS = "success";
const STATUS_FAILURE = "failed";

const initialState = {
  fetching: false,
  errors: [],
  status: null
};

export default prefix => {
  return {
    fetchStart: () => ({ type: concat(prefix, FETCH_REQUEST) }),
    fetchSuccess: () => ({ type: concat(prefix, FETCH_SUCCESS) }),
    fetchFailed: payload => {
      const errors = [
        ...pathOr([], ["validation", "keys"], payload),
        ...[pathOr(null, ["message"], payload)].filter(x => x !== null)
      ];

      return {
        type: concat(prefix, FETCH_FAILURE),
        payload: errors
      };
    },
    reducer: (state = initialState, action) => {
      const { type, payload } = action;

      switch (type) {
        case concat(prefix, FETCH_REQUEST):
          return { ...state, fetching: true };
        case concat(prefix, FETCH_FAILURE):
          return {
            ...state,
            fetching: false,
            errors: payload,
            status: STATUS_FAILURE
          };
        case concat(prefix, FETCH_SUCCESS):
          return {
            ...state,
            fetching: false,
            errors: [],
            status: STATUS_SUCCESS
          };
        default:
          return state;
      }
    }
  };
};

export const isFetching = ({ network: { fetching } }) => fetching;
export const isCached = ({ network: { status } }) => status === STATUS_SUCCESS;
