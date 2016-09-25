'use strict'
import React,{Component} from 'React'
import {
StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  PixelRatio,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'


const {height, width} = Dimensions.get('window');

//任务详情下的工具栏
export default class TaskToolbar extends Component {
  // 构造
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  render(){
    return(
      <View style={styles.Toolbar}>
        <View style={styles.ToolbarItem}><Icon name="chat-bubble-outline" size={20} color="#ccc" /><Text>...</Text></View>
        <View style={styles.ToolbarItem}><Icon name="thumbs-up" size={20} color="#ccc" /><Text>赞</Text></View>
        <View style={styles.ToolbarItem}><Icon name="star-outline" size={20} color="#ccc" /><Text>收藏</Text></View>
        <View style={styles.ToolbarItem}><Icon name="remove-circle-outline" size={20} color="#ccc" /><Text>取消</Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    Toolbar: {
      flex:1,
      backgroundColor: '#e0e',
      position: 'absolute',
      bottom: 0,
      left:0,
      right:0,
      height:55,
      flexDirection: 'row',
      alignItems: 'center',
    },
    ToolbarItem: {
      //backgroundColor: '#e00',
      marginTop: 1,
      marginBottom: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      width: width/4,
      borderRightColor: '#ccc',
      borderBottomWidth: 0.5,
    }
});
