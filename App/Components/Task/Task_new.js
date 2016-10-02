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

import TaskItem from './TaskItem_new'
import TaskEmpty from './../Empty/TaskEmpty'

//import Loading from './loading'
import TaskAddConstanter from '../../Constants/TaskAddConstanter'
import TaskDetailConstanter from '../../Constants/TaskDetailConstanter'
import Loading from '../Common/loading'

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'
import { SwipeListView } from 'react-native-swipe-list-view';

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class Task extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskStatus: props.TaskStatus,//默认显示未处理的任务
    }
  }

  componentWillMount(){
    InteractionManager.runAfterInteractions(() => {
      const {dispatch}  = this.props;
      const {token,userInfo} = this.props.user;
      //dispatch(requestTask());
      dispatch(fetchTaskList(userInfo.LOGINID,this.props.TaskStatus,token));
      //dispatch(fetchTaskList(userInfo.LOGINID,'2',token));
      //dispatch(fetchTaskList(userInfo.LOGINID,'3',token));
    });

  }

  //刷新任务
  _onRefresh() {
    this.componentWillMount();
  }

  //打开新建任务
  _toTaskAdd(){
    const {navigator} = this.props;
    navigator.push({
      name: 'TaskAdd',
      component: TaskAddConstanter,
    });
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

  //关闭当前行
  _closeRow(secdId,rowId,rowMap) {
    let _secdId = secdId;
    let _rowId = rowId;
    rowMap[`${_secdId}${_rowId}`].closeRow()
  }

  //任务状态切换
  _onChangeTab(status) {
    this.setState({taskStatus: status});
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
        case 2:
          this._closeRow(secdId,rowId,rowMap);
          break;
        case 1:
          Alert.alert(
            '提示',
            '您确定要删除该任务吗?',
            [
              {text: '取消', onPress: () => this._closeRow(secdId,rowId,rowMap)},
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

    //刷新任务列表
    /*
    if(this.props.task.isRefresh !== nextProps.task.isRefresh && nextProps.task.isRefresh) {
      this.componentWillMount();
    }*/
    if(this.props.task.addTaskResult !== nextProps.task.addTaskResult && nextProps.task.addTaskResult === 'success') {
      //console.log('任务成功===');
      dispatch(fetchTaskList(userInfo.LOGINID,'1',token));
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
    //let wclCount = !task.List['1'] ? 0 : task.List['1'].taskList.length;
    //let clzCount = !task.List['2'] ? 0 : task.List['2'].taskList.length;
    //let ywcCount = !task.List['3'] ? 0 : task.List['3'].taskList.length;

    let source = dataSource.cloneWithRows(task.List[this.state.taskStatus].taskList);
    if(task.isFetching){
      return(<Loading />);
    }
    return(
      <View style={styles.container}>
      {/**
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        tintColor={'#3F465A'}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        title={{title: '我的任务',tintColor:'#FFF'}}
        rightButton={<View style={{alignItems:'center',justifyContent: 'center',marginRight:10,}}><Icon name="ios-add-circle-outline" size={32} color='#FFF' onPress={() => this._toTaskAdd()}  /></View>}
        leftButton={Platform.OS==='android'?<View style={{alignItems:'center',justifyContent: 'center',marginLeft:10,}}><Icon name="ios-menu" size={32} color='#FFF' onPress={() => this.props.onPress()}  /></View>:<View/>}
        />
        <View style={styles.tabMain}>
          <TabCell isSelected={this.state.taskStatus === '1'} onPress={()=>this._onChangeTab('1')} title={'未处理 ('+wclCount+')'} />
          <TabCell isSelected={this.state.taskStatus === '2'} onPress={()=>this._onChangeTab('2')} title={'处理中 ('+clzCount+')'}/>
          <TabCell isSelected={this.state.taskStatus === '3'} onPress={()=>this._onChangeTab('3')} title={'已完成 ('+ywcCount+')'}/>
        </View>**/}
        {/*我是注释啊  这里判断列表是否为空*/}

        { (!task.List[this.state.taskStatus] || task.List[this.state.taskStatus].taskList.length === 0) ? <TaskEmpty onRefresh={()=>this._onRefresh()} /> :
          <SwipeListView
            ref='swipe'
            style={styles.Swipe}
            closeOnRowPress={true}
            enableEmptySections={true}
            automaticallyAdjustContentInsets={false}
            disableRightSwipe={true}
            pageSize={10}
            initialListSize={10}
            dataSource={source}
            renderRow={ (Task) =>
              (
                <TaskItem task={Task} User={user} onPress={this._openTaskDetail.bind(this,Task)} />
              )
          }
            renderHiddenRow={ (Task,secdId,rowId,rowMap) => {
              let t_status,changeStatus,changeStatusText;
              //处理任务状态,分自建的和被分配的任务
              t_status = Task.t_creator === user.userInfo.LOGINID? Task.t_status : Task.task_parter_status;

              switch (t_status) {
                  case '1':
                    changeStatusText = '处理中';
                    changeStatus = '2';
                    break;
                  case '2':
                    changeStatusText = '已完成';
                    changeStatus = '3';
                    break;
                  case '3':
                    changeStatusText = '归档';
                    changeStatus = '4';
                    break;
                  default:
                    break;
                }

               return(
                <View style={styles.rowBack}>
                    <TouchableOpacity
                    onPress={ () => this._showActionSheet(Task,secdId,rowId,rowMap) }
                    style={styles.RightBtnMore}>
                    <Text style={{fontSize:18,color:'#fff'}}>更多</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress={ () => this._changeTaskStatus(changeStatus,Task,secdId,rowId,rowMap) }
                     style={[styles.RightBtnDelete,{backgroundColor: '#64C0A5'}]}>
                    <Text style={{fontSize:18,color:'#fff'}}>{changeStatusText}{t_status}</Text>
                    </TouchableOpacity>
                </View>
            )}}
            refreshControl={
                      <RefreshControl
                          initialListSize={10}
                          pagingEnabled={false}
                          onEndReachedThreshold={30}
                          scrollRenderAheadDistance={90}
                          refreshing={task.isFetching}
                          onRefresh={() => this._onRefresh()}
                          colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                          progressBackgroundColor="#fff"
                          tintColor="blue"
                          />}
            //leftOpenValue={75}
            rightOpenValue={-150}
            tension={20}
            friction={20}
        />}
          </View>
    );
  }

}


class TabCell extends Component {
  render(){
    let selectedButtonStyle = {borderColor: 'transparent'};
    let selectedTitle;
    if(this.props.isSelected) {
      selectedButtonStyle = { borderColor: '#3F465A' };
      selectedTitle = {fontWeight:'bold',color:'#495B69'};
    }
    return(
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={()=>this.props.onPress()}
        style={[styles.tabCell, selectedButtonStyle]}>
        <Text style={[styles.tabCellTitle,selectedTitle]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
      //  marginTop: Platform.OS === 'android' ? 20 : 0,
    },
    Swipe:{
      marginBottom: Platform.OS === 'android' ? 0 : 48,
    },
    rowBack: {
  		alignItems: 'center',
  		//backgroundColor: '#DDD',
  		flex: 1,
  		flexDirection: 'row',
  		justifyContent: 'flex-end',
      height:20,
  	},
    RightBtnMore: {
  		alignItems: 'center',
  		bottom: 0,
  		justifyContent: 'center',
  		position: 'absolute',
  		top: 0,
  		width: 75,
      backgroundColor: '#bdbfbe',
		  right: 75
  	},
    RightBtnDelete: {
      flex:1,
  		alignItems: 'center',
  		bottom: 0,
  		justifyContent: 'center',
  		position: 'absolute',
  		top: 0,
  		width: 75,
      backgroundColor: 'red',
		  right: 0
  	},
    tabMain: {
      flexDirection: 'row',
      backgroundColor: '#eee',
    },
    tabCell:{
      //backgroundColor: '#eee',
      flex:1,
      height:40,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:5,
      borderBottomWidth: 3,
      paddingHorizontal: 10,
    },
    tabCellTitle: {
      fontSize:16,
    }
});


export default Task;
