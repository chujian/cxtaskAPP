'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  Alert,
  ListView,
  RefreshControl,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  ActionSheetIOS,
} from 'react-native'
import {requestTask,fetchTaskList,deleteTask,deleteStoreTask,taskStatusUpdate,storeTaskStatusUpdate} from '../../Actions/taskActions'

import TaskItem from './TaskItem'
import TaskEmpty from './../Empty/TaskEmpty'

import TaskAddConstanter from '../../Constants/TaskAddConstanter'
import TaskDetailConstanter from '../../Constants/TaskDetailConstanter'
import Loading from '../Common/loading'
import LoadMoreFooter from '../Common/LoadMoreFooter'
import TaskHandlerModal from '../Common/TaskHandlerModal'

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'
//import { SwipeListView } from 'react-native-swipe-list-view';


class Task extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      taskStatus: props.TaskStatus,//默认显示未处理的任务
      isLoading: true,
      page: 1,
      isLoadMore: false,
      isRefreshing: false,
    }
  }

  componentWillMount(){
    console.log("获取"+this.state.page);
    InteractionManager.runAfterInteractions(() => {
      const {dispatch}  = this.props;
      const {token,userInfo} = this.props.user;
      dispatch(fetchTaskList(userInfo.LOGINID,this.props.TaskStatus,token,this.state.page,this.state.isLoadMore, this.state.isRefreshing, this.state.isLoading));
    });
  }

  componentWillUnmount() {
    }

  //下拉刷新任务
  _onRefresh() {
    this.setState({
      page: 1,
      isLoadMore: false,
      isRefreshing: true,
      isLoading: false,
    });
     this.componentWillMount();
  }

  //上拉加载更多数据
  _loadMore() {
      const {dispatch,task}  = this.props;
      const {token,userInfo} = this.props.user;
      if(task.Status[this.state.taskStatus].isRefreshing || task.Status[this.state.taskStatus].isNoMore) return;

      this.setState({
        page: this.state.page+1,
        isLoadMore: true,
        isRefreshing: true,
        isLoading: false,
      });
      InteractionManager.runAfterInteractions(() => {
              dispatch(fetchTaskList(userInfo.LOGINID,this.props.TaskStatus,token,this.state.page,this.state.isLoadMore, this.state.isRefreshing, this.state.isLoading));
        });
  }

  //底部显示加载
  _renderFooter() {
    const {task} = this.props;
    if(task.Status[this.state.taskStatus].isLoadMore) {
      return <LoadMoreFooter />
    }
    if(task.Status[this.state.taskStatus].isNoMore) {
      return <View style={{flex:1,height:10,marginBottom:10,justifyContent: 'center',alignItems: 'center',}}><Text>没有更多数据</Text></View>
    }
  }

  //删除任务记录
  _deleteTask(Task,secdId,rowId,rowMap){
    const {dispatch} = this.props
    const {userInfo,token} = this.props.user

    //关闭该行
    this._closeRow(secdId,rowId,rowMap);

    if(userInfo.LOGINID !== Task.t_creator){
      Alert.alert('提示','对不起，您不是该任务的发布人，不能删除！');
    }else{
      //先删除本地任务,然后再去发送删除服务器任务
      dispatch(deleteStoreTask(this.state.taskStatus,Task.t_id));

      InteractionManager.runAfterInteractions(() => {
        dispatch(deleteTask(userInfo.LOGINID,Task.t_id,token));
      });
    }
  }

  //改变任务状态
  _changeTaskStatus(changeStatus,Task,secdId,rowId,rowMap) {
    const {dispatch} = this.props
    const {userInfo,token} = this.props.user
    //关闭该行
    this._closeRow(secdId,rowId,rowMap);
    console.log('原状态'+this.state.taskStatus+'新状态'+changeStatus);
    //先改变本地sotre，避免界面刷新，然后服务端修改
    //真是恶心呀，这里判断下吧，如果是已完成转成归档，本地做已完成删除该条记录就可以了，因为没归档列表，程序会出错
    if(changeStatus === '4'){
      dispatch(deleteStoreTask(this.state.taskStatus,Task.t_id));
    }else{
      dispatch(storeTaskStatusUpdate(this.state.taskStatus,changeStatus,Task.t_id));
    }

    InteractionManager.runAfterInteractions(() => {
      //changeStatus,userCode,task_id,token
      dispatch(taskStatusUpdate(changeStatus,userInfo.LOGINID,Task.t_id,token));
    });
  }
  //打开任务详情
  _openTaskDetail(Task) {
    const {navigator} = this.props;
    navigator.push({
      name: 'TaskDetail',
      component: TaskDetailConstanter,
      params: {
        taskInfo: Task,
      }
    });
  }

  //打开action操作
  _showActionSheet(Task,secdId,rowId,rowMap) {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['收藏任务','删除任务','取消'],
      cancelButtonIndex: 2,
      destructiveButtonIndex: 1,
    },
    (buttonIndex) => {
      switch (buttonIndex) {
        case 1:
          Alert.alert(
            '提示',
            '您确定要删除该任务吗?',
            [
              {text: '取消', onPress: () => null},
              {text: '确定', onPress: () => this._deleteTask(Task,secdId,rowId,rowMap)},
            ]
          )
          break;
        default:

      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {task} = this.props;
    const {dispatch}  = this.props;
    const {token,userInfo} = this.props.user;
    if(this.props.task.addTaskResult !== nextProps.task.addTaskResult && nextProps.task.addTaskResult === 'success') {
      //console.log('任务成功===');
      dispatch(fetchTaskList(userInfo.LOGINID,1,token,1,this.state.isLoadMore, this.state.isRefreshing, this.state.isLoading));
    }
	}

  render(){
    const {user,task,navigator} = this.props;
    const status = this.state.taskStatus;

    if(!task.List[this.state.taskStatus]) {
      task.List[this.state.taskStatus] = {
        taskList: [],
      }
    }

    if(task.Status[status].isLoading){
      return(<Loading />);
    }
    return(
      <View style={styles.container}>
        { (!task.List[this.state.taskStatus] || task.List[this.state.taskStatus].taskList.length === 0) ? <TaskEmpty onRefresh={()=>this._onRefresh()} /> :
          <ListView
                automaticallyAdjustContentInsets={false}
                enableEmptySections={true}
                initialListSize={10}
                dataSource={this.state.dataSource.cloneWithRows(task.List[this.state.taskStatus].taskList)}
                onEndReachedThreshold={10}
                onEndReached={()=>this._loadMore()}
                renderFooter={()=>this._renderFooter()}
                renderRow={(Task) => {
                  return (
                    <TaskItem
                      task={Task}
                      User={user}
                      onPress={this._openTaskDetail.bind(this,Task)}
                      onModalOpen={()=>this._showActionSheet()}
                    />
                  );
                }}
                refreshControl={
                          <RefreshControl
                              refreshing={task.Status[status].isRefreshing}
                              onRefresh={() => this._onRefresh()}
                              tintColor="#ff0000"
                              title="数据加载中..."
                              colors={['#ff0000', '#00ff00', '#0000ff']}
                              progressBackgroundColor="#ffff00"
                              />}
              />}
          </View>
    );
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
      //  marginTop: Platform.OS === 'android' ? 20 : 0,
      marginBottom: Platform.OS === 'android' ? 0 : 50,
    },
});


export default Task;
