import * as TYPES from '../Constants/ActionTypes';

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  failure: false,
  token: '',
  userInfo:{}
};

let userReducer = (state=initialState,action) => {
  switch (action.type) {
    case TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        failure: false,
      }
    case TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        userInfo: action.userInfo,
        token: action.token,
      }
    case TYPES.LOGIN_FAIL:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        failure: true,
        message: action.message
      }
    case TYPES.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default userReducer;
