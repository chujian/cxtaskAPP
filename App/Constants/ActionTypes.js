/**
 *用户登录
 **/
export const LOGIN_REQUEST = 'LOGIN_REQUEST'; //正在登录
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; //用户登录成功
export const LOGIN_FAIL = 'LOGIN_FAIL'; //登录失败
export const USER_LOGOUT = 'USER_LOGOUT'; //退出登录


/**
 *个人任务
 **/
export const TASK_REQUEST = 'TASK_REQUEST';//正在获取任务
export const TASK_RECEIVE = 'TASK_RECEIVE';//接收任务
export const TASK_RECEIVE_FAIL = 'TASK_RECEIVE_FAIL'//接收任务失败

export const TASK_LIST_REQUEST = 'TASK_LIST_REQUEST'; //正在获取任务列表
export const TASK_DETAIL_REQUEST = 'TASK_DETAIL_REQUEST';//正在获取任务详情
//export const TASK_RECEIVE_DETAIL = 'TASK_RECEIVE_DETAIL';//获取任务详情
export const TASK_LIST_RECEIVE = 'TASK_LIST_RECEIVE'; //接收任务列表
export const TASK_LIST_RECEIVE_FAIL = 'TASK_LIST_RECEIVE_FAIL';//获取任务列表失败

export const ADD_TASK_REQUEST = 'ADD_TASK_REQUEST'; //正在添加任务
export const ADD_TASK_RESULT = 'ADD_TASK_RESULT'; //添加任务结果
export const ADD_TASK_NOTE = 'ADD_TASK_NOTE';//添加任务备注
export const CHANGE_TASK_LEVEL = 'CHANGE_TASK_LEVEL';//改变任务级别
export const CANCEL_TASK = 'CANCEL_TASK';//取消编辑任务
export const TASK_REFRESH = 'TASK_REFRESH';//任务列表刷新
export const DELETE_STORE_TASK = 'DELETE_STORE_TASK';//删除本地任务
export const LOCAL_READ_TASK = 'LOCAL_READ_TASK';//本地数据标记已读
export const CHANGE_STORE_TASK_STATUS = 'CHANGE_STORE_TASK_STATUS';//修改本地任务状态

/**
*评论相关
*/
export const COMMENT_LIST_REQUEST='COMMENT_LIST_REQUEST';//评论请求
export const RECEIVE_COMMENT_LIST='RECEIVE_COMMENT_LIST';//获取评论列表
export const EMPTY_COMMENT_LIST='EMPTY_COMMENT_LIST';//清空评论列表

/**
*人员选择
*/
export const EMPLOYEE_LIST_REQUEST = 'EMPLOYEE_LIST_REQUEST';//正在获取员工
export const EMPLOYEE_LIST_RECEIVE = 'EMPLOYEE_LIST_RECEIVE';//接收员工列表
export const SELECTED_EMPLOYEES = 'SELECTED_EMPLOYEES';//选择人员
export const CLEAR_SELECTED_EMPLOYEES = 'CLEAR_SELECTED_EMPLOYEES';//清除选择
/**
*项目相关
*/
export const PROJECT_LIST_REQUEST = 'PROJECT_LIST_REQUEST';//正在获取项目
export const PROJECT_SAVE_ING = 'PROJECT_SAVE_ING'; //正在保存项目
export const PROJECT_SAVE_SUCCESS = 'PROJECT_SAVE_SUCCESS';//保存项目成功
export const PROJECT_ON_REFRESH = 'PROJECT_ON_REFRESH';//刷新列表
export const PROJECT_RECEIVE = 'PROJECT_RECEIVE';//接收项目


/**
*义诊活动相关
*/
export const ACTIVITY_REQUEST = 'ACTIVITY_REQUEST';//正在获取活动
export const ACTIVITY_RECEIVE = 'ACTIVITY_RECEIVE';//接收活动列表
export const ACTIVITY_RECEIVE_FAIL = 'ACTIVITY_RECEIVE_FAIL';//接收活动失败
