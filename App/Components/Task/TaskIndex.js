'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native'

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'

import Task from '../../Constants/TaskConstanter'
import TaskAddConstanter from '../../Constants/TaskAddConstanter'

class TaskIndex extends Component {
  //打开新建任务
  _toTaskAdd(){
    const {navigator} = this.props;
    navigator.push({
      name: 'TaskAdd',
      component: TaskAddConstanter,
    });
  }
  render() {
    //const {user,task} = this.props;
    //let wclCount = !task.List['1'] ? 0 : task.List['1'].taskList.length;
    //let clzCount = !task.List['2'] ? 0 : task.List['2'].taskList.length;
    //let ywcCount = !task.List['3'] ? 0 : task.List['3'].taskList.length;

    return(
      <View style = {{flex: 1}}>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        tintColor={'#3F465A'}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        title={{title: '我的任务',tintColor:'#FFF'}}
        rightButton={<View style={{alignItems:'center',justifyContent: 'center',marginRight:10,}}><Icon name="ios-add-circle-outline" size={32} color='#FFF' onPress={() => this._toTaskAdd()}  /></View>}
        leftButton={Platform.OS==='android'?<View style={{alignItems:'center',justifyContent: 'center',marginLeft:10,}}><Icon name="ios-menu" size={32} color='#FFF' onPress={() => this.props.onPress()}  /></View>:<View/>}
        />
        <ScrollableTabView
      style={{marginTop: 0, }}
      renderTabBar={() => <DefaultTabBar />}
    >
      <Task tabLabel={'未处理'} TaskStatus='1' />
      <Task tabLabel='处理中' TaskStatus='2'/>
      <Task tabLabel='已完成' TaskStatus='3'/>
    </ScrollableTabView>
    </View>
  );
  }
}

export default TaskIndex;
