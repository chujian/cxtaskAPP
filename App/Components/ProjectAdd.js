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
  Switch,
  Platform,
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import LeftButton from './LeftButton'
import Loading from './loading'
import DatePicker from './DatePicker'

import Icon from 'react-native-vector-icons/Ionicons'

import {
  fetchProject,
  saveProject,
  onRefreshProject
} from '../Actions/projectActions'

class ProjectAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      projectAddUserCode: '',
      projectHeader:'',
      projectHeaderCode: '',
      projectTitle: '',
      projectOject: '',
      projectIsOrder: false,
      isSaving: false,
      project_endDate: '',
    }
  }

  componentWillMount(){
    const {user,project} = this.props
    this.setState({
      projectAddUserCode: user.userInfo.LOGINID,
      projectHeader: user.userInfo.LASTNAME,
      projectHeaderCode: user.userInfo.LOGINID,
    });
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    if(this.props.project.isSaving !== nextProps.project.isSaving && nextProps.project.isSaving){
      this.setState({isSaving: true});
    }

    if(this.props.project.saveSuccess !== nextProps.project.saveSuccess && nextProps.project.saveSuccess === true) {
      this.setState({isSaving: false});
      this.props.navigator.pop();
    }
  }

  _chageIsOrder(){
    this.setState({projectIsOrder: !this.state.projectIsOrder});
  }

  //取消发布任务
  _projectCancel(){
    const {dispatch,navigator} = this.props

    if(this.state.projectTitle !== '' || this.state.projectOject !== '') {
      Alert.alert(
            '提示',
            '您确定需要取消本次新建项目的操作吗?',
            [
              {text: '点错了', onPress: () => console.log('取消关闭!')},
              {text: '确认', onPress: () => {
                //dispatch(cancelTask());
                navigator.pop();
              }},
            ]
          )
    }else{
      navigator.pop();
    }
  }

  _projectSaveConfirm(){
    const {token,userInfo} = this.props.user
    const {dispatch,navigator,project} = this.props

    const postData = {
					p_title: this.state.projectTitle,
					p_type: '团队',
					p_isvisible: true,
					p_ishints: true,
					p_isOrder: this.state.projectIsOrder,//任务顺序执行
					p_endDate: this.state.project_endDate,//任务结束日期
					p_objective: this.state.projectOject,//项目目标
					p_image: 'project.png',
					p_header: this.state.projectHeaderCode,//项目负责人
        }
      //  console.log(JSON.stringify(postData));
      InteractionManager.runAfterInteractions(() => {
        dispatch(saveProject(userInfo.LOGINID,postData,token));
        dispatch(onRefreshProject());
      });
  }

  _projectSave(){
    Alert.alert(
          '提示',
          '您确定保存吗?',
          [
            {text: '点错了', onPress: () => console.log('取消关闭!')},
            {text: '确认', onPress: () => {
              this._projectSaveConfirm()
              //dispatch(cancelTask());
              //navigator.pop();
            }},
          ]
        )
  }

  render(){
    const {user,project} = this.props

    const rightButtonConfig = {
      title: '保存',
      handler: () => this._projectSave(),
      tintColor: '#EEE'
    }

    const arrowIcon = (<Icon name="ios-arrow-forward-outline" size={24} color='#eee' />);

    return(
      <View style={styles.container}>
        <NavigationBar
          style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
          statusBar={{style:'light-content',showAnimation:'slide'}}
          tintColor={'#34b2e5'}
          title={{title: '新建项目'}}
          rightButton={rightButtonConfig}
          leftButton={<LeftButton onPress={()=>this._projectCancel()} />}
          />
          <Loading isLoading={this.state.isSaving} loadingTitle={'正在保存'} />
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.projectTitleView}>
              <TextInput
                underlineColorAndroid='transparent'
                style={{height: 45,marginLeft:5,}}
                placeholder='项目标题'
                onChangeText={(text) => this.setState({projectTitle: text})}
                value={this.state.projectTitle}
              />
            </View>
            <View style={styles.projectObject}>
              <TextInput
                underlineColorAndroid='transparent'
                style={{height: 45,marginLeft:5,}}
                placeholder='项目目标'
                onChangeText={(text) => this.setState({projectOject: text})}
                value={this.state.projectOject}
              />
            </View>

            <View style={styles.List}>
              <View style={styles.Item}>
                <View style={styles.Icon}>
                  <Icon name="md-person" size={32} color='#686765' />
                </View>
                <View style={[styles.ItemContent,{borderBottomWidth:0.5,borderBottomColor:'#ccc',}]}>
                  <View style={styles.ItemName}>
                    <Text>项目责任人</Text>
                  </View>
                  <View style={styles.ItemOfficer}>
                    <Text>{user.userInfo.LASTNAME}</Text>
                  </View>
                  <Icon name="ios-arrow-forward-outline" size={24} color='#eee' />
                </View>
              </View>

              <View style={styles.Item}>
                <View style={styles.Icon}>
                  <Icon name="ios-photos-outline" size={32} color='#686765' />
                </View>
                <View style={styles.ItemContent}>
                  <View style={styles.ItemName}>
                    <Text>项目类型</Text>
                  </View>
                  <View style={styles.ItemOfficer}>
                    <Text>{project.ProjectNew.projectType}</Text>
                  </View>
                  <Icon name="ios-arrow-forward-outline" size={24} color='#eee' />
                </View>
              </View>
            </View>

            <View style={styles.List}>

            <TouchableHighlight
                onPress={()=>this.refs.datepicker.open()}
                underlayColor="#bbbbbb"
                >
              <View style={styles.Item}>
                <View style={styles.Icon}>
                  <Icon name="md-stopwatch" size={32} color='#686765' />
                </View>
                <View style={[styles.ItemContent,{borderBottomWidth:0.5,borderBottomColor:'#ccc',}]}>
                  <View style={styles.ItemName}>
                    <Text>截至日期</Text>
                  </View>
                  <View style={styles.ItemOfficer}>
                    <Text>{this.state.project_endDate}</Text>
                  </View>
                  <Icon name="ios-arrow-forward-outline" size={24} color='#eee' />
                </View>
              </View>
              </TouchableHighlight>

              <View style={styles.Item}>
                <View style={styles.Icon}>
                  <Icon name="md-list" size={32} color='#686765' />
                </View>
                <View style={styles.ItemContent}>
                  <View style={styles.ItemName}>
                    <Text>项目标识</Text>
                  </View>
                  <View style={styles.ItemOfficer}>
                    <Text>图片</Text>
                  </View>
                  <Icon name="ios-arrow-forward-outline" size={24} color='#eee' />
                </View>
              </View>
            </View>

            <View style={styles.List}>
              <View style={styles.Item}>
                <View style={styles.Icon}>
                  <Icon name="ios-switch" size={32} color='#686765' />
                </View>
                <View style={styles.ItemContent}>
                  <View style={styles.ItemName}>
                    <Text>任务顺序执行</Text>
                  </View>
                  <View style={styles.ItemOfficer}>
                    <Switch
                      value={this.state.projectIsOrder}
                      onValueChange={()=>this._chageIsOrder()}
                    />
                  </View>
                  <Icon name="ios-arrow-forward-outline" size={24} color='#eee' />
                </View>
              </View>
              </View>

          </ScrollView>
          <DatePicker
          ref={'datepicker'}
          date={this.state.project_endDate}
          onSubmit={
            (date)=>{
              this.setState({project_endDate: date});
              //console.log('month='+date.getMonth());
              }
          }
          minimumDate={new Date()}
          />
          </View>);
  }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4',
    },
    scroll:{
      flex:1,
      padding:0,
    },
    projectTitleView: {
      backgroundColor: '#fff',
      justifyContent: 'center',
      height: 50,
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
    },
    projectObject: {
      marginTop:20,
      backgroundColor: '#fff',
      justifyContent: 'center',
      height: 50,
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
      borderTopColor: '#ccc',
      borderTopWidth: 0.5,
    },
    List:{
      marginTop:20,
      borderBottomWidth:0.5,
      borderBottomColor:'#ccc',
      borderTopWidth:0.5,
      borderTopColor:'#ccc',
      backgroundColor: '#FFF',
    },
    Item: {
      //justifyContent: 'space-between',
      alignItems:'center',
      flexDirection:'row',
    },
    Icon: {
      marginLeft:10,
    },
    ItemName: {
    //  marginLeft:10,
    },
    ItemContent: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection:'row',
      padding:10,
      marginLeft:10,
      //borderBottomWidth:0.5,
      //borderBottomColor:'#ccc',
    },
    ItemOfficer: {
      flex:1,
    //  backgroundColor:'#CCC',
      justifyContent: 'center',
      alignItems: 'flex-end',
      height: 36,
      marginRight:10,
    }
  });

export default ProjectAdd;
