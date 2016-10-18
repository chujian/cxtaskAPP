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
} from 'react-native'

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
      token: '',
      task_id: '',//任务id
      task_title: '',//任务标题
      task_executor: '',//发布人,执行人
      task_executorCode: '',//执行人code
      task_endDate: '',//任务结束日期
      task_parterCode: '',//任务参与人code
      task_parterName: '',//任务参与人姓名
      task_level: '1',//任务等级
      task_levelName: '',//任务等级含义
      task_note: '',//任务备注
      task_status: '1',//默认未处理
    //  taskStatusName: '',//状态中文显示
      project_id: 0,//项目id,默认0为个人项目
      project_title: '',//项目标题
      task_sortid: 0,//分类id,默认0为默认分类
      task_sortName: '',//分类名称
    }
  }

  //取消发布任务
  _taskCancel(){
    const {dispatch,navigator} = this.props
    navigator.pop();
  }

  //打开任务备注界面
  _openTaskNote(){
    const {navigator} = this.props
    navigator.push({
      name: 'TaskNote',
      component: TaskNote,
    });
  }

  //打开任务级别界面
  _openTaskLevel(){
    const {navigator} = this.props
    navigator.push({
      name: 'TaskLevel',
      component: TaskLevel,
    })
  }

  _openTaskProSortStatus(){
    const {navigator} = this.props
    navigator.push({
      name: 'TaskProSortStatus',
      component: TaskProjectSortStatus,
    });
  }

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

    let postData = {
      token: this.state.token,
      task_title: encodeURIComponent(this.state.task_title),
      task_executor: this.state.task_executorCode,
      task_executorCode: this.state.task_executorCode,
      task_endDate: this.state.task_endDate,
      task_parterCode: this.state.task_parterCode,
      task_parterName: this.state.task_parterName,
      task_level: this.state.task_level,
      task_levelName: this.state.task_levelName,
      task_note: encodeURI(this.state.task_note),
      task_status: this.state.task_status,
      project_id: this.state.project_id,
      task_sortid: this.state.task_sortid,
    }
    //出现正在保存
    this.setState({isLoading: true});
    //console.log(JSON.stringify(postData));
    dispatch(saveTask(user.userInfo.LOGINID,user.token,postData));
    navigator.pop();
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

    this.setState({
      token: token,//token
      task_id: taskInfo.t_id,//任务id
      task_title: taskInfo.t_title,//标题
      task_executor: taskInfo.t_creatorName,//发布人姓名
      task_executorCode: taskInfo.t_executor,//发布人ID
      task_note: taskInfo.t_notes,//任务备注
      task_level: taskInfo.t_levelid,
      task_levelName: task_levelName,//任务等级 中文
      task_parterName: taskInfo.t_partername,//参与人姓名
      task_parterCode: taskInfo.t_parterid,//参与人ID
      task_endDate: taskInfo.t_endDate,//任务结束日期
      project_id: taskInfo.t_projectid,//项目id
      project_title: taskInfo.p_title,//项目标题
      task_sortid: taskInfo.sort_id,//分类id
      task_sortName: taskInfo.sort_name,//分类名称
      //任务状态,如果本人创建的,显示主任务状态,否则显示参与人任务状态
      task_status: (userInfo.LOGINID === taskInfo.t_executor) ? taskInfo.t_status : taskInfo.task_parter_status,
    });
      //备注dispatch
      dispatch(addTaskNote(taskInfo.t_notes));
      //任务级别dispatch
      dispatch(changeTaskLevel(task_levelName));
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
    //备注赋值
    if(nextProps.task.taskNew.taskNote !== this.props.task.taskNew.taskNote) {
      this.setState({task_note: nextProps.task.taskNew.taskNote});
    }
    //等级赋值
    if(nextProps.task.taskNew.taskLevel !== this.props.task.taskNew.taskLevel) {
      this.setState({task_levelName: nextProps.task.taskNew.taskLevel});
      if(nextProps.task.taskNew.taskLevel === '普通') {
        this.setState({task_level: '1'});
      }else if(nextProps.task.taskNew.taskLevel === '紧急') {
        this.setState({task_level: '2'});
      }else{
        this.setState({task_level: '3'});
      }
    }
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

      //this.setState({task_parterName: chooseName});
      //this.setState({task_parterCode: chooseLOGINID.substring(0,chooseLOGINID.length-1)});
    }
  }

  render(){
    const {navigator} = this.props

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
          tintColor={'#3F465A'}
          title={{title: '任务详情',tintColor:'#FFF'}}
          rightButton={rightButtonConfig}
          leftButton={<LeftButton onPress={()=>this._taskCancel()} />}
          />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.taskTitleView}>
            <TextInput
              style={{height: 45,marginLeft:5,fontSize:20}}
              placeholder='任务标题'
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({task_title: text})}
              value={this.state.task_title}
            />
          </View>
          <TouchableHighlight
              onPress={()=>this._openTaskProSortStatus()}
              underlayColor="#A8CEBF"
              >
          <View style={[styles.Item,{backgroundColor:'#FFF'}]}>
            <View style={styles.ItemContent}>
              <View style={styles.ItemTitle}>
                <Text style={styles.TitleFont}>{this.state.task_sortName}  {this.state.project_title}</Text>
              </View>
              <View style={styles.ItemContentMain}>
              <Text style={styles.TitleFont}>{taskStatus}</Text>
              </View>
            </View>
          </View>
          </TouchableHighlight>

          <View style={styles.List}>
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-contact" size={32} />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContent}>
              <View style={styles.ItemTitle}>
                <Text style={styles.TitleFont}>发布人</Text>
              </View>
              <View style={styles.ItemContentMain}>
              <Text>{this.state.task_executor} ({this.state.task_executorCode})</Text>
              </View>
              <View style={styles.arrowIcon}>
              {arrowIcon}
              </View>
            </View>
          </View>
          <TouchableHighlight
              onPress={()=>this.refs.datepicker.open()}
              underlayColor="#A8CEBF"
              >
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-time-outline" size={32} />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContentLaster}>
              <View style={styles.ItemTitle}>
                <Text style={styles.TitleFont}>结束日期</Text>

              </View>
              <View style={styles.ItemContentMain}>
              <Text>{this.state.task_endDate}</Text>
              </View>
              <View style={styles.arrowIcon}>
              {arrowIcon}
              </View>
            </View>
          </View>
          </TouchableHighlight>
          </View>

          <View style={styles.List}>
          <TouchableHighlight
              onPress={()=>this._openDepartmentEmployee()}
              underlayColor="#A8CEBF"
              >
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-contacts" size={32} />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContent}>
              <View style={styles.ItemTitle}>
                <Text style={styles.TitleFont}>接收人</Text>
              </View>
              <View style={styles.ItemContentMain}>
              <Text>{this.state.task_parterName}</Text>
              </View>
              <View style={styles.arrowIcon}>
              {arrowIcon}
              </View>
            </View>
          </View>
          </TouchableHighlight>
          <TouchableHighlight
              onPress={()=>this._openTaskLevel()}
              underlayColor="#A8CEBF"
              >
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-megaphone-outline" size={32} />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContentLaster}>
              <View style={styles.ItemTitle}>
                <Text style={styles.TitleFont}>任务等级</Text>
              </View>
              <View style={styles.ItemContentMain}>
              <Text>{this.state.task_levelName}</Text>
              </View>
              <View style={styles.arrowIcon}>
              {arrowIcon}
              </View>
            </View>
          </View>
          </TouchableHighlight>
          </View>

          <View style={styles.List}>
          <TouchableHighlight
              onPress={()=>this._openTaskNote()}
              underlayColor="#A8CEBF"
              >
            <View style={styles.Item}>
              {/*icon view*/}
              <View style={styles.ItemIcon}>
                <Icon name="ios-list-box-outline" size={32} />
              </View>
              {/*ItemContent*/}
              <View style={styles.ItemContentNote}>
                <View style={styles.ItemTitle}>
                  <Text style={styles.TitleFont}>内容</Text>
                </View>
                <View style={styles.ItemContentMain}>
                <Text>{this.state.task_note}</Text>
                </View>
                <View style={styles.arrowIcon}>
                {arrowIcon}
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
        backgroundColor: '#efeff4',
    },
    scroll:{
      padding:0,
    },
    taskTitleView:{
      backgroundColor: '#fff',
      justifyContent: 'center',
      height: 65,
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
    },
    List:{
      marginTop:15,
      borderBottomWidth:0.5,
      borderBottomColor:'#ccc',
      borderTopWidth:0.5,
      borderTopColor:'#ccc',
      backgroundColor: '#FFF',
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
      paddingLeft:10,
      paddingRight:10,
      height: 56,
    },
    ItemContentLaster: {
      flex:1,
      height: 56,
      paddingLeft:10,
      paddingRight:10,
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
      alignItems:'flex-end',
      marginRight:5,
      paddingLeft:5,
      flexWrap: 'wrap',
    },
    TitleFont:{
      fontSize:15,
      color:'#000',
    }
});
export default TaskDetail;
