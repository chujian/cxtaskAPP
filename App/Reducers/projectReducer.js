import * as TYPES from '../Constants/ActionTypes';

const initialState = {
  isFetching: true,
  isSaving: false,
  isRefresh: false,//是否刷新列表
  projectList:{
    data:[],
  },
  ProjectNew:{
    projectType: '团队',
  }
};

let projectReducer = (state=initialState,action) => {
  switch (action.type) {
    case TYPES.PROJECT_LIST_REQUEST:
    return {
      ...state,
      //isFetching: true,
      isRefresh: false,
      saveSuccess: false,
    }
    case TYPES.PROJECT_SAVE_ING:
    return {
      ...state,
      isSaving: true,
    }
    case TYPES.PROJECT_SAVE_SUCCESS:
    return {
      ...state,
      isSaving: false,
      saveSuccess: true,
    }
    case TYPES.PROJECT_ON_REFRESH:
    return {
      ...state,
      isRefresh: true,
    }
    case TYPES.PROJECT_RECEIVE:
    return {
      ...state,
      isFetching: false,
      projectList: action.projectList,
    }
    default:
    return state;
  }
}

export default projectReducer;
