'use strict'
import {
    Platform,
    StatusBar,
} from 'react-native';
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
                userCode: userCode,
                comment_body: postData.comment_body,
                task_id: taskId,
                post_from: postData.post_from,
                post_addr: postData.post_addr,
                token: token
              })
            })
            .then((response) => response.json())
            .then((json) => {
              let result = json.status === '00' ? 'success' : 'fail';
              dispatch(receiveHandleResult(result,json.message));
              dispatch(emptyCommentList());
            })
            .catch((error) => {
                dispatch(receiveHandleResult('fail','保存评论失败'));
                dispatch(emptyCommentList());
            });
  }
}

//服务器删除评论
export let deleteComment = (userCode,token,commentId) => {
  return dispatch => {
    Platform.OS === 'ios' ? StatusBar.setNetworkActivityIndicatorVisible(true) : null;
    fetch(`${APPSERVER}/delComment?userCode=${userCode}&comment_id=${commentId}&token=${token}`)
    .then((response) => response.json())
    .then((json) => {
      Platform.OS === 'ios' ? StatusBar.setNetworkActivityIndicatorVisible(false) : null;
      if(json.status === "00") {
        let result = json.status === '00' ? 'success' : 'fail';
        dispatch(receiveHandleResult(result,json.message));
        dispatch(emptyCommentList());
      }
    })
    .catch((error) => {
      Platform.OS === 'ios' ? StatusBar.setNetworkActivityIndicatorVisible(false) : null;
      dispatch(receiveHandleResult('fail','删除评论失败'));
      dispatch(emptyCommentList());
    })
    .done()
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

//操作返回结果
export let receiveHandleResult = (result,message) => {
  return {
    type: TYPES.HANDLE_COMMENT_RESULT,
    result,
    message
  }
}
