import { AUTH_SUCCESS, AUTH_FAIL } from "../Actions/type";

const initialState = {
  auth: [],
  status: "PLEASE LOGIN!",
  isLoggedIn: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        auth: action.payload,
        status: AUTH_SUCCESS,
        isLoggedIn: true,
      };
    case "AUTH_FAIL":
      return {
        ...state,
        auth: action.payload,
        status: AUTH_FAIL,
        isLoggedIn: false,
      };
    default:
      return state;
  }
}
