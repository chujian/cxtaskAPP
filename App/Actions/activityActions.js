'use strict'
//import {Alert} from 'react-native';
import * as TYPES from '../Constants/ActionTypes';

//获取tasklist
export let fetchActivity = (userCode,token) => {
  console.log('userCode='+userCode);
    return dispatch => {
        dispatch(requestActivity());
        return fetch(`http://120.26.61.237:4188/app/clinicList?employeeNo=${userCode}&token=${token}`)
            .then((response) => response.json())
            .then((json) => {
              //console.log(JSON.stringify(json));
              dispatch(receiveActivity(json));
            })
            .catch((error) => {
                dispatch({type: TYPES.ACTIVITY_RECEIVE_FAIL});
                console.log('获取活动失败===' + error);
            });
    };
}

export let requestActivity = () => {
  return {
      type: TYPES.ACTIVITY_REQUEST,
      //isFetching: true
  }
}

export let receiveActivity = (activityList) => {
  return {
    type: TYPES.ACTIVITY_RECEIVE,
    isFetching: false,
    activityList
  }
}
