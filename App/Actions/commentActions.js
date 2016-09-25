'use strict'
import {APPSERVER,APPKEY} from '../Utils/config';
import * as TYPES from '../Constants/ActionTypes';

/**
*评论action
*/

//获取评论
export let fetchCommentList = (taskId,token)=>{
  return dispatch => {
            dispatch(requestCommentList());
            return fetch(`${APPSERVER}/taskCommentList?task_id=${taskId}&token=${token}`)
                .then((response) => response.json())
                .then((json) => {
                  //console.log(JSON.stringify(json));
                  dispatch(receiveCommentList(json.data));
                })
                .catch((error) => {
                    dispatch({type: TYPES.COMMENT_LIST_RECEIVE_FAIL});
                    console.log('获取评论失败===' + error);
                });
  }
}

//发表一个反馈/评论
export let postComment = (userCode,taskId,token,postData) => {
  return dispatch => {
          fetch(`${APPSERVER}/saveComment`, {
              method: "POST",
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({

              })
            })
            .then((response) => response.json())
            .then((json) => {
            })
            .catch((error) => {
                console.log('保存任务失效' + error);
            });
  }
}

//发送请求
let requestCommentList = () => {
  return{
    type: TYPES.COMMENT_LIST_REQUEST
  }
}

//清空评论
export let emptyCommentList = () => {
  return {
    type: TYPES.EMPTY_COMMENT_LIST
  }
}

//接收评论列表
let receiveCommentList = (list) => {
  return {
    type: TYPES.RECEIVE_COMMENT_LIST,
    list
  }
}
