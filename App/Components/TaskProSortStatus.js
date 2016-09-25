'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  Platform,
  ScrollView,
  TouchableHighlight,
} from 'react-native'

import TaskLevel from '../Constants/TaskLevelConstanter'

import NavigationBar from 'react-native-navbar'
import {fetchTask,cancelTask} from '../Actions/taskActions'
import Icon from 'react-native-vector-icons/Ionicons'

class TaskProjectSortStatus extends Component {

  //打开任务级别界面
  _openTaskLevel(){
    const {navigator} = this.props
    navigator.push({
      name: 'TaskLevel',
      component: TaskLevel,
    })
  }

  render(){
    const arrowIcon = (<Icon name="ios-arrow-forward-outline" size={24} color='#eee' />);
    return(
      <View style={styles.container}>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        tintColor={'#3F465A'}
        title={{title: '我的任务',tintColor:'#FFF'}}
        leftButton={<View style={{alignItems:'center',justifyContent: 'center',marginLeft:10,}}><Icon name="ios-arrow-dropleft" size={32} color='#FFF' onPress={() => this.props.navigator.pop()}  /></View>}
        />
        <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.List}>
        <View style={styles.Item}>
          {/*icon view*/}
          <View style={styles.ItemIcon}>
            <Icon name="ios-contacts" size={32} />
          </View>
          {/*ItemContent*/}
          <View style={styles.ItemContent}>
            <View style={styles.ItemTitle}>
              <Text>所属项目</Text>
            </View>
            <View style={styles.ItemContentMain}>
            <Text>个人项目</Text>
            </View>
            <View style={styles.arrowIcon}>
            {arrowIcon}
            </View>
          </View>
        </View>
        <View style={styles.Item}>
          {/*icon view*/}
          <View style={styles.ItemIcon}>
            <Icon name="ios-contacts" size={32} />
          </View>
          {/*ItemContent*/}
          <View style={styles.ItemContent}>
            <View style={styles.ItemTitle}>
              <Text>所属分类</Text>
            </View>
            <View style={styles.ItemContentMain}>
            <Text>默认分类</Text>
            </View>
            <View style={styles.arrowIcon}>
            {arrowIcon}
            </View>
          </View>
        </View>
        <TouchableHighlight
            onPress={()=>this._openTaskLevel()}
            underlayColor="#bbbbbb"
            >
        <View style={styles.Item}>
          {/*icon view*/}
          <View style={styles.ItemIcon}>
            <Icon name="ios-megaphone-outline" size={32} />
          </View>
          {/*ItemContent*/}
          <View style={styles.ItemContentLaster}>
            <View style={styles.ItemTitle}>
              <Text>任务状态</Text>
            </View>
            <View style={styles.ItemContentMain}>
            <Text>未处理</Text>
            </View>
            <View style={styles.arrowIcon}>
            {arrowIcon}
            </View>
          </View>
        </View>
        </TouchableHighlight>
        </View>
        </ScrollView>
      </View>
    );
  }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4',
    },
    List:{
      marginTop:30,
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
    },
    ItemIcon: {
      marginLeft:10,
    },
    ItemContent: {
      height: 52,
      flex:1,
      //paddingLeft:10,
      paddingRight:10,
      marginLeft:10,
      flexDirection:'row',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
    },
    ItemContentLaster: {
      height: 52,
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
    }
});
export default TaskProjectSortStatus;
