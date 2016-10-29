'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Alert,
  Platform,
  DatePickerIOS,
  Image,
} from 'react-native'

import moment from 'moment'
import 'moment/locale/zh-cn'
moment().locale('zh-cn');

import NavigationBar from 'react-native-navbar'
import LeftButton from '../Common/LeftButton'
import DatePicker from '../Common/DatePicker'
import TaskToolbar from './TaskToolbar'

import TaskNote from '../../Constants/TaskNoteConstanter'
import TaskLevel from '../../Constants/TaskLevelConstanter'
import TaskProjectSortStatus from './TaskProSortStatus'
import EmployeeConstanter from '../../Constants/EmployeeConstanter'
import CommentListConstanter from '../../Constants/CommentListConstanter'
import CommentAddConstanter from '../../Constants/CommentAddConstanter'

import {fetchTaskDetail,cancelTask,saveTask,readTask,addTaskNote,changeTaskLevel,localReadTask} from '../../Actions/taskActions'

import Icon from 'react-native-vector-icons/Ionicons'

class TaskDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  //打开任务级别界面
  _openTaskLevel(){
    const {navigator} = this.props
    navigator.push({
      name: 'TaskLevel',
      component: TaskLevel,
    })
  }

  //打开员工界面
  _openDepartmentEmployee(){
    const {navigator} = this.props
    navigator.push({
      name: "Employee",
      component: EmployeeConstanter,
    });
  }

  //打开评论添加界面
  _openCommentAdd(){
    const {navigator,taskInfo} = this.props
    navigator.push({
      name: "CommentAdd",
      component: CommentAddConstanter,
      params: {
        task_id: taskInfo.t_id,
      }
    });
  }

  //保存任务
  _saveTask(){
    const {dispatch,user,navigator} = this.props

    if(this.state.task_title.length < 3) {
      Alert.alert("请输入标题,并且大于3个字");
      return false;
    }
    if(this.state.task_endDate === '') {
      Alert.alert("请选择结束日期");
      return false;
    }
    //出现正在保存
    this.setState({isLoading: true});
    //console.log(JSON.stringify(postData));
    //dispatch(saveTask(user.userInfo.LOGINID,user.token,postData));
    navigator.pop();
  }

  //头像地址
  _picpath(){
    if(this.props.taskInfo.picpath.substr(0,4) == 'http') {
      return(<Image
          style={styles.face}
          source={{uri: this.props.taskInfo.picpath}}
        />);
        }else{
          return(<Image
          style={styles.face}
          source={this.props.taskInfo.picpath === "woman.jpg"?require('../../Images/woman.jpg'):require('../../Images/man.jpg')}
        />);
      }
    }

  //组件状态赋值
  componentWillMount(){
    //taskInfo 是task父组件传递过来的
    const {dispatch,taskInfo} = this.props
    const {token,userInfo} = this.props.user

    //任务等级
    let task_levelName = '';
    if(taskInfo.t_levelid === '1') {
      task_levelName = "普通";
    }else if(taskInfo.t_levelid === '2') {
      task_levelName = "紧急";
    }else{
      task_levelName = "非常紧急";
    }
      //备注dispatch
      //dispatch(addTaskNote(taskInfo.t_notes));
      //任务级别dispatch
      //dispatch(changeTaskLevel(task_levelName));
  }

  //组件加载后
  componentDidMount(){
    const {dispatch,taskInfo} = this.props
    const {token} = this.props.user
    //标记已读
    InteractionManager.runAfterInteractions(() => {
      //服务器已读
      dispatch(readTask(this.props.taskInfo.t_id,token));
      //本地已读
      if(this.props.taskInfo.t_unRead === '1') {
        dispatch(localReadTask(this.props.taskInfo.t_id,this.props.taskInfo.t_status));
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {taskDetail} = this.props.task
    const {token} = this.props.user

    //选择人员赋值
    //if(this.props.employee.chooseEmployee !== nextProps.employee.chooseEmployee) {
    if(nextProps.employee.chooseEmployee) {
      let chooseName = '';
      let chooseLOGINID = '';
      const chooseEmployee = nextProps.employee.chooseEmployee;
      const chooseEmployeeCount = chooseEmployee.length;
      for (var key in chooseEmployee)
      {
          chooseName += chooseEmployee[key]+',';
          chooseLOGINID += key+',';
      }
    }
  }

  render(){
    const {navigator,taskInfo,user} = this.props

    const arrowIcon = (<Icon name="ios-arrow-forward-outline" size={24} color='#eee' />);
    const rightButtonConfig = {
      title: '保存',
      handler: () => this._saveTask(),
      tintColor: '#FFF'
    }

    //任务状态
    let taskStatus = '';
    if(this.state.task_status === '1') {
      taskStatus = '未处理';
    }else if(this.state.task_status === '2') {
      taskStatus = "处理中";
    }else{
      taskStatus = "已完成";
    }

    return(
      <View style={styles.container}>
        <NavigationBar
          style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
          statusBar={{style:'light-content',showAnimation:'slide'}}
          tintColor={'#288fd2'}
          title={{title: '任务详情',tintColor:'#FFF'}}
          rightButton={rightButtonConfig}
          leftButton={<LeftButton onPress={()=>navigator.pop()} />}
          />
        <ScrollView contentContainerStyle={styles.scroll}>

          {/*任务头部*/}
          <View style = {styles.ItemHead}>
            {this._picpath()}
            <View style = {styles.TaskPublisher}><Text style={styles.creatorName}>{taskInfo.t_creatorName}</Text><Text style={{fontSize:13,color:'#CCC',paddingTop:5}}>{moment(taskInfo.t_createTime).format("MMMDo hh:mm:ss")} 来自iphone</Text></View>
            <View style = {styles.ItemTaskStatus}><Text style={{fontSize:13,color:'#89CBC1'}}>任务-{taskStatus}</Text><Text style={{fontSize:12,color:'#ccc'}}>{taskInfo.parterCompletedTotal}/{taskInfo.parterTotal}</Text></View>
          </View>

          {/*任务标题*/}
          <View style = {styles.TaskTitleView}>
            <Text style={styles.TaskTitle}>{taskInfo.t_levelid === '3' ? '!!!' : ''}{taskInfo.t_title}</Text>
          </View>

          {/*任务内容*/}
          <View style = {styles.TaskContentView}>
            <View style={styles.TaskContentMainView}>
            <Text style={styles.TaskContent}>{taskInfo.t_notes === '' ? '无任务内容' : taskInfo.t_notes}</Text>
            </View>
          </View>

          <View style={styles.List}>
          {/*任务接收人*/}
          <TouchableHighlight
              onPress={()=>{user.userInfo.LOGINID === taskInfo.t_creator ? this._openDepartmentEmployee() : null}}
              underlayColor="#CDCDCD">
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-people-outline" size={20} color="#8D98A6" />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContent}>
              <View style={styles.ItemContentMain}>
                <Text>{taskInfo.t_partername}</Text>
              </View>
              <View style={styles.arrowIcon}>
              {user.userInfo.LOGINID === taskInfo.t_creator ? <Icon name="ios-arrow-forward-outline" size={24} color='#eee' /> : null}
              </View>
            </View>
          </View>
          </TouchableHighlight>

          {/*到期日期*/}
          <TouchableHighlight
              onPress={()=>{user.userInfo.LOGINID === taskInfo.t_creator ? this._openDepartmentEmployee() : null}}
              underlayColor="#CDCDCD">
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-time-outline" size={20} color="#8D98A6" />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContent}>
              <View style={styles.ItemContentMain}>
                <Text>{moment(taskInfo.t_createTime).format('dddd')},{moment(taskInfo.t_createTime).format("MMM Do")}</Text>
              </View>
              <View style={styles.arrowIcon}>
              {user.userInfo.LOGINID === taskInfo.t_creator ? <Icon name="ios-arrow-forward-outline" size={24} color='#eee' /> : null}
              </View>
            </View>
          </View>
          </TouchableHighlight>

          {/*提醒*/}
          <TouchableHighlight
              onPress={()=>{user.userInfo.LOGINID === taskInfo.t_creator ? this._openDepartmentEmployee() : null}}
              underlayColor="#CDCDCD">
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-notifications-outline" size={20} color="#8D98A6" />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContentLaster}>
              <View style={styles.ItemContentMain}>
              <Text>5分钟前</Text>
              </View>
              <View style={styles.arrowIcon}>
              {user.userInfo.LOGINID === taskInfo.t_creator ? <Icon name="ios-arrow-forward-outline" size={24} color='#eee' /> : null}
              </View>
            </View>
          </View>
          </TouchableHighlight>

          </View>

          <CommentListConstanter {...this.props}  taskId={this.props.taskInfo.t_id}/>
        </ScrollView>

        <DatePicker
        ref={'datepicker'}
        date={this.state.task_endDate}
        onSubmit={
          (date)=>{
            this.setState({task_endDate: date});
            //console.log('month='+date.getMonth());
            }
        }
        minimumDate={new Date()}
        />
        <TaskToolbar {...this.props} openComment={()=>this._openCommentAdd()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#F8F8F8',
        backgroundColor:'#ffffff',
    },
    scroll:{
      padding:0,
      //backgroundColor:'#fff',
    },
    taskTitleView:{
      backgroundColor: '#fff',
      justifyContent: 'center',
      height: 65,
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
    },
    //任务标题字体
    TaskTitle: {
      fontSize:15,
      flex:1,
      color:'#B0B0B0',
    },
    List:{
      //marginTop:15,
      borderBottomWidth:0.5,
      borderBottomColor:'#ccc',
      borderTopWidth:0.5,
      borderTopColor:'#ccc',
      backgroundColor: '#FFF',
      marginBottom:10,
    },
    Item: {
      flex:1,
      justifyContent: 'space-between',
      alignItems:'center',
      flexDirection:'row',
    },
    ItemIcon: {
      marginLeft:10,
    },
    ItemContent: {
      flex:1,
      flexDirection:'row',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
      //paddingLeft:10,
      //paddingRight:10,
      //backgroundColor: '#e0e',
      height: 40,
    },
    ItemContentLaster: {
      flex:1,
      height: 40,
      //paddingLeft:10,
      //paddingRight:10,
      flexDirection:'row',
    },
    ItemContentNote: {
      flex:1,
      paddingLeft:10,
      paddingRight:10,
      paddingTop:10,
      paddingBottom:10,
      flexDirection:'row',
    },
    arrowIcon:{
      justifyContent:'center',
      alignItems:'center',
      width:20,
    },
    ItemTitle:{
      justifyContent:'center',
      alignItems:'center',
    },
    ItemContentMain:{
      flex:1,
      justifyContent:'center',
      alignItems:'flex-start',
      paddingLeft:10,
      paddingRight:10,
      flexWrap: 'wrap',
      //backgroundColor: '#ccc',
    },
    TitleFont:{
      fontSize:15,
      color:'#000',
    },
    ItemHead: {
      flex: 1,
      //padding:10,
      backgroundColor: '#fff',
      marginLeft:10,
      marginRight:10,
      //paddingLeft:15,
      //paddingRight:15,
      paddingTop:10,
      paddingBottom:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'center',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
    },
    TaskPublisher: {
      flex:1,
      alignItems:'flex-start',
    },
    //任务状态
    ItemTaskStatus: {
      width: 100,
      alignItems:'flex-end',
    },
    //任务内容外框View
    TaskContentView:{
      padding:10,
      backgroundColor:'#FFF',
    },
    //内容主要区域
    TaskContentMainView:{
      backgroundColor:'#DFF3FE',
    },
    //任务内容
    TaskContent: {
      fontSize: 15.5,
      color:'#B0B0B0',
      lineHeight: 20,
      flex:1,
    },
    face: {
      width: 42,
      height: 42,
      borderRadius: 2,
      marginRight:10,
    },
    TaskTitleView: {
      backgroundColor: '#fff',
      padding:10,
      justifyContent: 'center',
      alignItems:'flex-start',
      flexWrap: 'wrap',
    },
});
export default TaskDetail;
