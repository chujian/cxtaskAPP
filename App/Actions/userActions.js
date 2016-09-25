import {APPSERVER,APPKEY} from '../Utils/config';
import * as TYPES from '../Constants/ActionTypes';


//用户登录,参数为用户名和密码
export let userLogin = (userCode, userPassWd) => {
    return dispatch => {
        dispatch(userLoginRequest()); //显示正在登录
        return fetch(`${APPSERVER}/LoginCheck`,{
                  method: "POST",
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Origin' : '' ,
                    'Host' : 'task.cxjky.com'
                  },
                  body: JSON.stringify({
                    userCode: userCode,
                    passWd: userPassWd
                  })
                })
            .then((response) => response.json())
            .then((json) => {
                if (json.status === '00') {
                    dispatch(userLoginSuccess(json.data, json.token));
                } else {
                    dispatch(userLoginFail(json.message));
                }
            })
            .catch((error) => {
                dispatch(userLoginFail('网络原因,登录失败'));
                dispatch(userLogOut());
                console.log('登录失败==' + error);
            });
    };
}

//正在登录....userCode
export let userLoginRequest = () => {
    return {
        type: TYPES.LOGIN_REQUEST,
    };
}

//用户登录成功
export let userLoginSuccess = (userInfo, token) => {
    return {
        type: TYPES.LOGIN_SUCCESS,
        token,
        userInfo,
    };
}

//用户登录失败
export let userLoginFail = (message) => {
    return {
        type: TYPES.LOGIN_FAIL,
        message,
    };
}

//用户退出登录
export let userLogOut = () => {
    return {
        type: TYPES.USER_LOGOUT
    };
}
