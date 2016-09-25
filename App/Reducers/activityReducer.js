import * as TYPES from '../Constants/ActionTypes';

const initialState = {
  isFetching: true,
  activityList:{
    data:[],
  }
};

let activityReducer = (state=initialState,action) => {
  switch (action.type) {
    case TYPES.ACTIVITY_REQUEST:
    return {
      ...state,
      //isFetching: true,
    }
    case TYPES.ACTIVITY_RECEIVE:
    return {
      ...state,
      isFetching: false,
      activityList: action.activityList,
    }
    case TYPES.ACTIVITY_RECEIVE_FAIL:
    return initialState;
    default:
    return state;
  }
}

export default activityReducer;
