'use strict'
import {
    Platform,
} from 'react-native';
import {APPSERVER,APPKEY} from '../Utils/config';
import * as TYPES from '../Constants/ActionTypes';
import toQueryString from '../Utils/request'
import {StatusBar} from 'react-native'

//获取tasklist
export let fetchTaskList = (userCode, taskStatus, token) => {
    return dispatch => {
        if (Platform.OS === 'ios') {
          StatusBar.setNetworkActivityIndicatorVisible(true);
        }
        dispatch(requestTask());
        fetch(`${APPSERVER}/getTask?userCode=${userCode}&task_status=${taskStatus}&token=${token}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((json) => {
              if (Platform.OS === 'ios') {
                StatusBar.setNetworkActivityIndicatorVisible(false);
              }
              dispatch(receiveTaskList(json.data,taskStatus));
            })
            .catch((error) => {
                if (Platform.OS === 'ios') {
                  StatusBar.setNetworkActivityIndicatorVisible(false);
                }
                dispatch(receiveTaskList([]));
                dispatch({type: TYPES.TASK_RECEIVE_FAIL});
                console.log('获取任务列表失效' + error);
            });
    };
}

//export let favoriteTask = (userCode,)

//保存一个任务
export let saveTask = (userCode,token,postData) => {
  return dispatch => {
    //dispatch(requestTask());
    fetch(`${APPSERVER}/saveTask`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              task_projectid: postData.project_id,
              task_sortid: postData.task_sortid,
              task_status: postData.task_status,
              task_title: postData.task_title,
              task_creator: userCode,
              task_executor: postData.task_executorCode,
              task_endDate: postData.task_endDate,
              task_remind:0,
              task_parterid: postData.task_parterCode,
              task_level: postData.task_level,
              task_notes: postData.task_note,
              userCode: userCode,
              token: token
            })
        })
        .then((response) => response.json())
        .then((json) => {
          //console.log('savetask===='+JSON.stringify(json));
          //dispatch(receiveTask(json));
        })
        .catch((error) => {
            //dispatch({type: TYPES.TASK_RECEIVE_FAIL});
            console.log('保存任务失效' + error);
        });
  }
}

//服务器删除一个任务
export let deleteTask = (userCode,task_id,token) => {
  return dispatch => {
    StatusBar.setNetworkActivityIndicatorVisible(true);
    fetch(`${APPSERVER}/deleteTask?userCode=${userCode}&task_id=${task_id}&token=${token}`)
    .then((response) => response.json())
    .then((json) => {
      StatusBar.setNetworkActivityIndicatorVisible(false);
      if(json.status === "00") {
        //dispatch(refreshTask());//这里可以添加消息提示,暂时不高兴了
      }
    })
    .catch((error) => {
      StatusBar.setNetworkActivityIndicatorVisible(false);
    })
    .done()
  }
}

//改变任务状态
export let taskStatusUpdate = (changeStatus,userCode,task_id,token) => {
  return dispatch => {
    StatusBar.setNetworkActivityIndicatorVisible(true);
    fetch(`${APPSERVER}/changeTaskStatus?userCode=${userCode}&task_id=${task_id}&token=${token}&task_status=${changeStatus}`)
    .then((response) => response.json())
    .then((json) => {
      if(json.status === "00") {
        //dispatch(refreshTask());//这里可以添加消息提示,暂时不高兴了
        console.log("message=="+json.message);
      }
    })
    .catch((error) => {
      StatusBar.setNetworkActivityIndicatorVisible(false);
    })
    .done(() => {StatusBar.setNetworkActivityIndicatorVisible(false);})
  }
}

//改变本地任务状态，参数 原状态 新状态 用户CODE 任务ID token
export let storeTaskStatusUpdate = (oldStatus,changeStatus,task_id) => {
  return {
    type: TYPES.CHANGE_STORE_TASK_STATUS,
    oldStatus,
    changeStatus,
    task_id
  }
}


//服务器修改为已读
export let readTask = (taskId,token) => {
  return dispatch => {
    fetch(`${APPSERVER}/readTask?task_id=${taskId}&token=${token}`)
        .catch((error) => {
            console.log('任务标记已读失败' + error);
        });
  }
}

//本地删除一个任务,这里主要想加快删除列表,避免网络刷新,可以有效的避免流量问题.
export let deleteStoreTask = (status,index) => {
  return {
    type: TYPES.DELETE_STORE_TASK,
    status,
    index
  }
}

//正在获取task列表
export let requestTask = () => {
    return {
        type: TYPES.TASK_REQUEST,
        isFetching: true,
    }
}

//接收tasklist
export let receiveTaskList = (taskList,taskStatus) => {
    return {
        type: TYPES.TASK_RECEIVE,
        isFetching: false,
        taskList,
        taskStatus
    }
}

//接收任务详情
export let receiveTaskDetail = (taskDetail) => {
    return {
        type: TYPES.TASK_RECEIVE_DETAIL,
        isFetching: false,
        taskDetail
    }
}

//本地消息修改为已读
export let localReadTask = (taskId,taskStatus) => {
  return {
    type: TYPES.LOCAL_READ_TASK,
    taskId,
    taskStatus,
  }
}

//添加note
export let addTaskNote = (note) => {
  return {
    type: TYPES.ADD_TASK_NOTE,
    note
  }
}

//改变任务的等级
export let changeTaskLevel = (level) => {
  return {
    type: TYPES.CHANGE_TASK_LEVEL,
    level
  }
}

//改变任务状态
export let changeTaskStatus = (status) => {
  return {
    type: TYPES.CHANGE_TASK_STATUS,
    status
  }
}

//刷新任务
export let refreshTask = () => {
  return {
    type: TYPES.TASK_REFRESH
  }
}

//取消编辑任务
export let cancelTask = () => {
  return {
    type: TYPES.CANCEL_TASK
  }
}
