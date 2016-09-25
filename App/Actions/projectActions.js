'use strict'
//import {Alert} from 'react-native';
import * as TYPES from '../Constants/ActionTypes';

//获取项目列表
export let fetchProject = (userCode, token) => {
    return dispatch => {
        dispatch(requestProject());
        return fetch(`http://task.cxjky.com:3080/app/ProjectList?userCode=${userCode}&token=${token}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((json) => {
              console.log("执行接收");
              dispatch(receiveProject(json));
            })
            .catch((error) => {
                dispatch({type: TYPES.TASK_RECEIVE_FAIL});
                console.log('获取项目失效' + error);
            })
            .done();
    };
}

export let saveProject = (userCode,postData,token) => {
  return dispatch => {
    dispatch(saveProjectIng());

    return fetch(`http://task.cxjky.com:3080/app/saveProject?userCode=${userCode}&token=${token}&p_title=${postData.p_title}&p_type=${postData.p_type}&p_isvisible=${postData.p_isvisible}&p_ishints=${postData.p_ishints}&p_isOrder=${postData.p_isOrder}&p_endDate=${postData.p_endDate}&p_objective=${postData.p_objective}&p_image=${postData.p_image}&p_header=${postData.p_header}`)
            .then((response) => response.json())
            .then((json) => {
              dispatch(saveSuccess());
              dispatch(onRefreshProject());
              console.log(JSON.stringify(json));
            })
            .catch((error) => {
                //dispatch({type: TYPES.TASK_RECEIVE_FAIL});
                console.log('获取任务失败===' + error);
            });
  }
}

//正在获取
export let requestProject = () => {
    return {
        type: TYPES.PROJECT_LIST_REQUEST
    }
}

export let onRefreshProject = () => {
  return {
    type: TYPES.PROJECT_ON_REFRESH
  }
}

//正在保存项目
export let saveProjectIng = () => {
  return {
    type: TYPES.PROJECT_SAVE_ING
  }
}

//保存项目成功
export let saveSuccess = () => {
  return {
    type: TYPES.PROJECT_SAVE_SUCCESS
  }
}

//接收项目列表
export let receiveProject = (projectList) => {
    return {
        type: TYPES.PROJECT_RECEIVE,
        projectList
    }
}
