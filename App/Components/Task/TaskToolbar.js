'use strict'
import React,{Component} from 'React'
import {
StyleSheet,
  View,
  Text,
  TextInput,
  Dimensions,
  PixelRatio,
  TouchableOpacity,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'


const {Wheight, Wwidth} = Dimensions.get('window');

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
        <View style={styles.ItemToolBarView}>
        <TouchableOpacity
          onPress={()=>this.props.openComment()}
          underlayColor="#A8CEBF"
          style={[styles.ItemToolBar,{borderRightWidth:0.5,borderColor:'#CCC'}]}
          >
          <View><Text style={{fontSize:12,paddingLeft:5}}><Icon name="ios-text-outline" size={20} color='#000'/>回复</Text></View>
          </TouchableOpacity>
          <View style={[styles.ItemToolBar,{borderRightWidth:0.5,borderColor:'#555555'}]}><Icon name="ios-heart-outline" size={18} color='#000'/><Text style={{fontSize:12,paddingLeft:5}}>赞</Text></View>
          <View style={styles.ItemToolBar}><Text style={{fontSize:12,paddingLeft:5}}>完成任务</Text></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    Toolbar: {
      flex:1,
      backgroundColor: '#ffffff',
      position: 'absolute',
      bottom: 0,
      left:0,
      right:0,
      //height:40,
      borderTopWidth:0.5,
      borderColor:'#ccc',
    },
    ItemToolBarView: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'space-between',
      height:40,
      padding:10,
    },
    ItemToolBar: {
      flex:1,
      width: Wwidth/3,
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'center',
    }
});
