import * as TYPES from '../Constants/ActionTypes';

const initialState = {
  commentList:{
    isFetching: false,
    List:[],
  }
};

let commentReducer = (state=initialState,action) => {
  switch (action.type) {
    case TYPES.COMMENT_LIST_REQUEST:
    return {
      ...state,
      commentList:{
        isFetching: true,
        List:[],
      }
    }
    case TYPES.RECEIVE_COMMENT_LIST:
    return {
      ...state,
      commentList:{
        isFetching: false,
        List: action.list,
      }
    }
    case TYPES.EMPTY_COMMENT_LIST:
    return {
      ...state,
      commentList:{
        isFetching: false,
        List:[],
      }
    }
    default:
    return state;
  }
}

export default commentReducer;
