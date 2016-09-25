'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  ListView,
  RefreshControl,
  Platform,
  DatePickerIOS,
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'

class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
    }
  }

  onDateChange(date){
    console.log(date);
  }

  render(){
    const rightButtonConfig = {
      title: '增加',
      handler: () => this._toTaskAdd(),
    };
    return(
      <View>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        tintColor={'#3F465A'}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        title={{title: '我的消息',tintColor:'#FFF'}}
        rightButton={rightButtonConfig}
        leftButton={Platform.OS==='android'?<View style={{alignItems:'center',justifyContent: 'center',marginLeft:10,}}><Icon name="ios-menu" size={32} color='#FFF' onPress={() => this.props.onPress()}  /></View>:<View/>}
        />
        <DatePickerIOS
          date={this.state.date}
          mode="date"
          timeZoneOffsetInMinutes={8 * 60}
          onDateChange={this.onDateChange.bind(this)}
        />
      </View>
    );
  }
}

export default Message;
