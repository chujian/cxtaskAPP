import * as TYPES from '../Constants/ActionTypes';

const initialState = {
  //先初始化几个任务状态的 状态
  Status:{
    [1]:{
      isLoading: true,
      isLoadMore: false,
      isRefreshing: false,
      isNoMore: false,
    },
    [2]:{
      isLoading: true,
      isLoadMore: false,
      isRefreshing: false,
      isNoMore: false,
    },
    [3]:{
      isLoading: true,
      isLoadMore: false,
      isRefreshing: false,
      isNoMore: false,
    },
  },
  List:{},
  taskNew:{
    taskNote: '',
    taskLevel: '正常',
    taskSort: '0',
    taskStatus: '1',
  },
};

let taskReducer = (state=initialState,action) => {
  switch (action.type) {
    //请求任务
    case TYPES.TASK_REQUEST:
    return {
      ...state,
      Status: {
        ...state.Status,
        [action.taskStatus]: {
          isLoadMore: action.isLoadMore,
          isRefreshing: action.isRefreshing,
          isLoading: action.isLoading,
        }
      }
    }
    case TYPES.TASK_DETAIL_REQUEST:
    return {
      ...state,
      taskDetail: {
        isFetching : true,
      }
    }
    //接收任务
    case TYPES.TASK_RECEIVE:
    return {
      ...state,
      List: {
        ...state.List,
        [action.taskStatus]: {
          taskList: state.Status[action.taskStatus].isLoadMore ? state.List[action.taskStatus].taskList.concat(action.taskList) : action.taskList,
        }
      },
      Status: {
        ...state.Status,
        [action.taskStatus]: {
          isLoadMore: false,
          isRefreshing: false,
          isLoading: false,
          isNoMore: action.isNoMore,
        }
      },
    }
    case TYPES.DELETE_STORE_TASK:
    return {
      ...state,
      List: getDelTask(state,action.index,action.status),
    }
    case TYPES.TASK_RECEIVE_FAIL:
    return {
      ...state,
      isFetching: false,
    }
    case TYPES.ADD_TASK_NOTE:
    return {
      ...state,
      taskNew:{
        taskNote: action.note,
        taskLevel: state.taskNew.taskLevel
      }
    }
    case TYPES.CHANGE_TASK_LEVEL:
    return {
      ...state,
      taskNew:{
        taskNote: state.taskNew.taskNote,
        taskLevel: action.level,
        taskSort: state.taskNew.taskSort,
        taskStatus: state.taskNew.taskStatus,
      }
    }
    case TYPES.CHANGE_TASK_STATUS:
    return {
      ...state,
      taskNew:{
        taskNote: state.taskNew.taskNote,
        taskLevel: state.taskNew.taskLevel,
        taskSort: state.taskNew.taskSort,
        taskStatus: action.status,
      }
    }
    case TYPES.CANCEL_TASK:
    return {
      ...state,
      taskNew:{
        taskNote: '',
      }
    }
    //本地任务已读标记
    case TYPES.LOCAL_READ_TASK:
    return {
      ...state,
      List: getReadTask(state,action.taskId,action.taskStatus)
    }

    //修改本地任务状态
    case TYPES.CHANGE_STORE_TASK_STATUS:
    return {
      ...state,
      List: taskStatusUpdate(state,action.oldStatus,action.changeStatus,action.task_id)
    }

    case TYPES.TASK_REFRESH:
    return {
      ...state,
    }

    //任务添加结果
    case TYPES.ADD_TASK_RESULT:
    return {
      ...state,
      addTaskResult: action.result,
      message: action.message,
    }

    //重置状态
    /*
    case TYPES.RESET_TASK_STATE:
    return {
      ...state,
      isLoading: true,
      isLoadMore: false,
      isRefreshing: false,
      isNoMore: false,
    }*/

    default:
    return state;
  }
}

/*根据任务状态生成新的对象*/
function getNewCache(oldState, taskList, taskStatus) {
  let newTaskList = [];
  let newState = { ...oldState };

  newTaskList = taskList.slice(0);

  newState.List[taskStatus] = {
    taskList: newTaskList
  };
  return newState.List;
}

/*得到删除后的任务数据*/
function getDelTask(oldState,taskIndex,taskStatus) {
  let newTaskList = [];
  let newState = { ...oldState };
  newTaskList = oldState.List[taskStatus].taskList.filter(task =>
        task.t_id !== taskIndex
      )
      newState.List[taskStatus] = {
        taskList: newTaskList
      };
      return newState.List;
}

/*修改本地任务状态*/
function taskStatusUpdate(oldState,oldStatus,changeStatus,taskIndex) {
  let oldStatusTask = []; //原状态的任务
  let oldStatusNewTaskList = []; //原状态更改后的新列表
  let newStatusNewTaskList = []; //新状态更改后的新列表
  let newState = { ...oldState };
  oldStatusTask = oldState.List[oldStatus].taskList.filter(task =>
    task.t_id === taskIndex
  )
  console.log('oldtask'+oldStatusTask);
  newStatusNewTaskList = oldState.List[changeStatus].taskList.concat(oldStatusTask);
  oldStatusNewTaskList = oldState.List[oldStatus].taskList.filter(task =>
        task.t_id !== taskIndex
      )

  newState.List[changeStatus] = {
    taskList: newStatusNewTaskList
  };

  newState.List[oldStatus] = {
    taskList: oldStatusNewTaskList
  };

  return newState.List;
}

/*标记已读*/
function getReadTask(oldState,taskIndex,taskStatus) {
  let newTaskList = [];
  let newState = { ...oldState };
  newTaskList = oldState.List[taskStatus].taskList.map(task =>
    task.t_id === taskIndex ? Object.assign({}, task, { t_unRead: 0 }) : task
  )
  newState.List[taskStatus] = {
    taskList: newTaskList
  };
  return newState.List;
}

export default taskReducer;
