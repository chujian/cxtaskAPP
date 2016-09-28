import * as TYPES from '../Constants/ActionTypes';

const initialState = {
  isFetching: true,
  isRefresh: false,//是否刷新列表
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
    case TYPES.TASK_REQUEST:
    return {
      ...state,
      isFetching: action.isFetching,
      isRefresh: false,
    }
    case TYPES.TASK_DETAIL_REQUEST:
    return {
      ...state,
      taskDetail: {
        isFetching : true,
      }
    }
    case TYPES.TASK_RECEIVE:
    return {
      ...state,
      isFetching: action.isFetching,
      List: getNewCache(state, action.taskList, action.taskStatus),
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
      isRefresh: true
    }

    //任务添加结果
    case TYPES.ADD_TASK_RESULT:
    return {
      ...state,
      addTaskResult: action.result,
      message: action.message,
    }

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
