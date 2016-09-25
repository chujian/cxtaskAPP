'use strict'
import {APPSERVER,APPKEY} from '../Utils/config';
import * as TYPES from '../Constants/ActionTypes';

//获取员工
export let fetchEmployee = (departNo,token) => {
    return dispatch => {
        dispatch(requestEmployee());
        return fetch(`${APPSERVER}/getDepartEmployee?parentid=${departNo}&token=${token}`)
            .then((response) => response.json())
            .then((json) => {
            //  console.log(JSON.stringify(json));
              //let departId = departNo === '' ? 'department' : departNo;
              if(json.status === '00') {
                dispatch(receiveEmployee(departNo,json.data));
              }else{
                dispatch(receiveEmployee(departNo,[]));
              }
            })
            .catch((error) => {
                dispatch(receiveEmployee([]));
                console.log('获取员工列表===' + error);
            });
    };
}

//查询员工
export let searchEmployee = (searchName,token) => {
    return dispatch => {
        console.log('searchName='+searchName);
        dispatch(requestEmployee());
        return fetch(`${APPSERVER}/getDepartEmployee?parentid=&search=${searchName}&token=${token}`)
            .then((response) => response.json())
            .then((json) => {
              if(json.status === '00') {
                dispatch(receiveEmployee('search',json.data));
              }else{
                dispatch(receiveEmployee('search',[]));
              }
            })
            .catch((error) => {
                dispatch(receiveEmployee('search',[]));
                console.log('查询员工列表失败===' + error);
            });
    };
}

//获取员工请求
export let requestEmployee = () => {
  return {
      type: TYPES.EMPLOYEE_LIST_REQUEST,
      //isFetching: true
  }
}

//接收员工列表
export let receiveEmployee = (departId,employeeList) => {
  return {
    type: TYPES.EMPLOYEE_LIST_RECEIVE,
    isFetching: false,
    departId,
    employeeList
  }
}

//选择员工
export let applyEmployee = (employees) => {
  return {
    type: TYPES.SELECTED_EMPLOYEES,
    employees
  }
}

//清除选择员工
export let clearEmployee = () => {
  return {
    type: TYPES.CLEAR_SELECTED_EMPLOYEES
  }
}
