import {
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNIN_USER_START,
  SIGNIN_USER_FAIL,
  SIGNOUT_USER_FAIL,
} from "../../constants/ActionTypes";

let userData = JSON.parse(localStorage.getItem("al-user"));
let INTIAL_STATE = {
  assignmentData: [],
  userData: userData,
  loading: false,
  logoutloading: false,
};

export default (state = INTIAL_STATE, action) => {
  switch (action.type) {
    // case SIGNOUT_USER_START: {
    //   return { ...state, logoutloading: true };
    // }
    case SIGNIN_USER_START: {
      return { ...state, loading: true, userData: null };
    }
    case SIGNIN_USER_SUCCESS:
      return { ...state, userData: action.payload, loading: false };

    case SIGNIN_USER_FAIL: {
      return { ...state, loading: false };
    }
    case SIGNOUT_USER_SUCCESS: {
      return { ...state, userData: null, };
    }
    case SIGNOUT_USER_FAIL: {
      return { ...state, userData: null, logoutloading: false };
    }
    default:
      return { ...state };
  }
};
