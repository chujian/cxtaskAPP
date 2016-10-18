import * as TYPES from '../Constants/ActionTypes';

const initialState = {
  isFetching: false,
  CommentResult: '',
  Message: '',
  List:[],
};

let commentReducer = (state=initialState,action) => {
  switch (action.type) {
    case TYPES.COMMENT_LIST_REQUEST:
    return {
      ...state,
      isFetching: true,
    }
    //接收列表
    case TYPES.RECEIVE_COMMENT_LIST:
    return {
      ...state,
      isFetching: false,
      List: action.list,
    }
    //添加评论结果
    case TYPES.HANDLE_COMMENT_RESULT:
    return {
      ...state,
      CommentResult: action.result,
      Message: action.message,
    }
    //评论重置
    case TYPES.EMPTY_COMMENT_LIST:
    return {
      ...state,
      isFetching: false,
      CommentResult: '',
    }
    default:
    return state;
  }
}

export default commentReducer;
