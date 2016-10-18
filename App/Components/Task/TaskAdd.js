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
import Loading from '../Common/loading';

import TaskNote from '../../Constants/TaskNoteConstanter'
import TaskLevel from '../../Constants/TaskLevelConstanter'
import TaskProjectSortStatus from './TaskProSortStatus'
import EmployeeConstanter from '../../Constants/EmployeeConstanter'

import {cancelTask,saveTask,fetchTaskList} from '../../Actions/taskActions'
import {clearEmployee} from '../../Actions/employeeActions'
import Icon from 'react-native-vector-icons/Ionicons'

class TaskAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      task_title: '',
      task_executor: '',
      task_executorCode: '',//执行人code
      task_endDate: '',//任务结束日期
      task_parterCode: '',//任务参与人code
      task_parterName: '',//任务参与人姓名
      task_level: '1',//任务等级
      task_levelName: '',//任务等级含义
      task_note: '',//任务备注
      task_status: '1',//默认未处理
      project_id: 0,//项目id,默认0为个人项目
      task_sortid: 0,//分类id,默认0为默认分类
      addressJSON: {},//地址信息
      isLoading: false,
    }
  }

  //取消发布任务
  _taskCancel(){
    const {dispatch,navigator} = this.props

    if(this.state.task_title !== '' || this.state.task_note !== '' ) {
      Alert.alert(
            '提示',
            '您确定需要取消本次新建任务的操作吗?',
            [
              {text: '点错了', onPress: () => console.log('取消关闭!')},
              {text: '确认', onPress: () => {
                //任务初始化
                dispatch(cancelTask());
                //清除选择的人
                dispatch(clearEmployee());
                navigator.pop();
              }},
            ]
          )
    }else{
      navigator.pop();
    }
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
      addressJSON: encodeURI(this.state.addressJSON),
    }
    //出现正在保存
    this.setState({isLoading: true});
    //console.log(JSON.stringify(postData));
    dispatch(saveTask(user.userInfo.LOGINID,user.token,postData));

    //dispatch(fetchTaskList(user.userInfo.LOGINID,'1',user.token));

    InteractionManager.runAfterInteractions(()=>{
      navigator.pop();
    })
  }

  //组件加载前
  componentWillMount(){
    const {userInfo} = this.props.user
    const {taskNew} = this.props.task
    const {chooseEmployee} = this.props.employee
    let chooseName = '';
    let chooseLOGINID = '';
    for (var key in chooseEmployee)
    {
        chooseName += chooseEmployee[key]+',';
        chooseLOGINID += key+',';
    }
    this.setState({
      token: userInfo.token,//token
      task_executor: userInfo.LASTNAME,//发布人姓名
      task_executorCode: userInfo.LOGINID,//发布人ID
      task_note: taskNew.taskNote,//任务备注
      task_levelName: taskNew.taskLevel,//任务等级 中文
      task_parterName: chooseName,
      task_parterCode: chooseLOGINID.substring(0,chooseLOGINID.length-1),
    });
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    this.setState({isLoading: nextProps.user.isFetching});
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

      this.setState({task_parterName: chooseName});
      this.setState({task_parterCode: chooseLOGINID.substring(0,chooseLOGINID.length-1)});
    }
  }

  render(){
    const {navigator} = this.props
    const {taskNew} = this.props.task

    const rightButtonConfig = {
      title: '保存',
      handler: () => this._saveTask(),
      tintColor: '#EEE'
    }

    const arrowIcon = (<Icon name="ios-arrow-forward-outline" size={24} color='#eee' />);

    return(
      <View style={styles.container}>
      <Loading isLoading={this.state.isLoading} loadingTitle={'正在保存'} />
        <NavigationBar
          style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
          statusBar={{style:'light-content',showAnimation:'slide'}}
          tintColor={'#3F465A'}
          title={{title: '发布任务',tintColor:'#FFF'}}
          rightButton={rightButtonConfig}
          leftButton={<LeftButton onPress={()=>this._taskCancel()} />}
          />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.taskTitleView}>
            <TextInput
              style={{height: 55,marginLeft:5,fontSize:20,}}
              placeholder='任务标题'
              maxLength={18}
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({task_title: text})}
              value={this.state.task_title}
            />
          </View>
          <TouchableHighlight
              onPress={()=>this._openTaskProSortStatus()}
              underlayColor="#A8CEBF"
              >
          <View style={styles.Item}>
            <View style={styles.ItemContent}>
              <View style={styles.ItemTitle}>
                <Text style={styles.TitleFont}>任务分类   个人项目</Text>
              </View>
              <View style={styles.ItemContentMain}>
              <Text style={styles.TitleFont}>{this.state.task_levelName}</Text>
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
              <Icon name="ios-contacts-outline" size={32} />
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
              onPress={()=>Alert.alert('ddd')}
              underlayColor="#A8CEBF"
              >
          <View style={styles.Item}>
            {/*icon view*/}
            <View style={styles.ItemIcon}>
              <Icon name="ios-alarm-outline" size={32} />
            </View>
            {/*ItemContent*/}
            <View style={styles.ItemContent}>
              <View style={styles.ItemTitle}>
                <Text style={styles.TitleFont}>提醒</Text>
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
                <Text style={styles.TitleFont}>任务级别</Text>
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
              <View style={styles.ItemContentLaster}>
                <View style={styles.ItemTitle}>
                  <Text style={styles.TitleFont}>任务内容</Text>
                </View>
                <View style={styles.ItemContentMain}>
                <Text>{this.state.task_note.length>30?this.state.task_note.substr(0,30)+'...':this.state.task_note}</Text>
                </View>
                <View style={styles.arrowIcon}>
                {arrowIcon}
                </View>
              </View>
            </View>
            </TouchableHighlight>
          </View>

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
      justifyContent: 'space-between',
      alignItems:'center',
      flexDirection:'row',
      backgroundColor:'#FFF',
    },
    ItemIcon: {
      marginLeft:10,
    },
    ItemContent: {
      height: 56,
      flex:1,
      paddingLeft:10,
      paddingRight:10,
      flexDirection:'row',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
    },
    ItemContentLaster: {
      height: 56,
      flex:1,
      paddingLeft:10,
      paddingRight:10,
      flexDirection:'row',
    },
    arrowIcon:{
      justifyContent:'center',
      alignItems:'center',
      width:20,
    },
    ItemTitle:{
      justifyContent:'center',
      alignItems:'flex-start',
    },
    ItemContentMain:{
      flex:1,
      justifyContent:'center',
      alignItems:'flex-end',
      marginRight:5,
      paddingLeft:5,
    },
    TitleFont:{
      fontSize:15,
      color:'#000',
    }
});

export default TaskAdd;
