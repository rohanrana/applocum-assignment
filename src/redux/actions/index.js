import UtilService from "../../service/ApiService";
import {  API_SIGN_IN } from "../../constants/ApiConstants";
import {
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  SIGNIN_USER_START,
  SIGNIN_USER_FAIL,
} from "../../constants/ActionTypes";
import OpenNotification from "../../components/OpenNotification";
import { RESPONSE_OK } from "../../constants/common";

// export const getAssignments = data => {
//   return dispatch => {
//     //   dispatch({ type: FETCH_START });
//     let obj = {
//       ...API_GET_ASSIGNMENTS
//     };
//     dispatch({ type: GET_ALL_ASSIGNMENTS_START });

//     UtilService.callApi(obj, (err, data) => {
//       if (data && data.length !== 0) {
//         dispatch({ type: GET_ALL_ASSIGNMENTS_SUCCESS, payload: data });
//       } else {
//         dispatch({ type: GET_ALL_ASSIGNMENTS_FAIL, payload: data });
//       }
//     });
//   };
// };
export const userSignIn = (data, props) => {
  return (dispatch) => {
    //here we can call api to
    //temporory storedata

    dispatch({ type: SIGNIN_USER_START });
    let request = {
      ...API_SIGN_IN,
      request: data,
    };
    UtilService.callApi(request, (err, res) => {
      if (res.status === RESPONSE_OK) {
        console.log("LOGGED IN", res);
        let user = res.data.user;
        let token = res.data.user.auth_token;
        localStorage.setItem("al-user", JSON.stringify(user));
        localStorage.setItem("al-token", JSON.stringify(token));
        dispatch({ type: SIGNIN_USER_SUCCESS, payload: user });
      } else {
        dispatch({ type: SIGNIN_USER_FAIL });

        OpenNotification({ type: "error", title: res.message });
      }
    });
  };
};

export const userSignOut = (props) => {
  return (dispatch) => {
    // const token = JSON.parse(localStorage.getItem("sl-token"));
    localStorage.clear();
    props.history.push("/login");
    dispatch({ type: SIGNOUT_USER_SUCCESS });


    // ------  i have commnented api call because there is an issue with logout api it throws 404 error --------
    // let request = {
    //   ...API_SIGN_OUT,
    //   request: {
    //     AUTH_TOKEN: token,
    //   },
    // };
    // UtilService.callApi(request, (err, res) => {
    //   if (res.status == RESPONSE_OK) {
    //     localStorage.clear();
    //     props.history.push("/login");
    //   } else {
    //     dispatch({ type: SIGNIN_USER_FAIL });
    //     OpenNotification({ type: "error", title: res.message });
    //   }
    //   if(err){
    //     OpenNotification({type:"success", title:""})
    //   }
    // });

  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = JSON.parse(localStorage.getItem("sl-token"));

    if (token) {
      let user = JSON.parse(localStorage.getItem("sl-user"));
      dispatch({ type: SIGNIN_USER_SUCCESS, payload: user });
    } else {
      userSignOut();
    }
  };
};
