'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  DatePickerIOS,
  TouchableOpacity,
  Modal,
} from 'react-native';

var deviceScreen = require('Dimensions').get('window');

export default class DatePicker extends React.Component{

  constructor(props){
  super(props);
  this.state = {
    date: new Date(),
    dateModel:'date',
    animationType: 'none',
    modalVisible: false,
    transparent: true,
  };
}

  render() {

    return(
      <Modal
        ref={'modal'}
        animationType={this.state.animationType}
        transparent={this.state.transparent}
        visible={this.state.modalVisible}
        onRequestClose={() => null}
        >
        <View style={styles.container}>
        <TouchableOpacity onPress={()=>this.setState({modalVisible: false})}>
        <View style={{backgroundColor:'black',width:deviceScreen.width,height:deviceScreen.height,opacity:0.3}} />
        </TouchableOpacity>
        <View style={styles.calendarMain}>
          <View style={styles.calendarHeader}>
            <TouchableHighlight onPress={()=>this._cancel()} underlayColor={'#eee'}>
            <Text style={styles.textStyle}>取消</Text>
            </TouchableHighlight>
            <Text style={[styles.textStyle,{color:'#000'}]}>请选择日期</Text>
            <TouchableHighlight onPress={()=>this._applySelectDate()} underlayColor={'#eee'}>
            <Text style={styles.textStyle}>确定</Text>
            </TouchableHighlight>
          </View>
          {/**
          <View style = {styles.datePicker}>*/}
            <DatePickerIOS
            date={this.state.date}
            mode={this.state.dateModel}
            timeZoneOffSetInMinutes={8*60}
            onDateChange={(date)=>this._onDateChange(date)}
            minimumDate={new Date()}
            />
          {/**</View>*/}
        </View>

        </View>
      </Modal>
    );
  }
  _cancel(){
    this.setState({date:new Date()});
    this.setState({modalVisible: false});
    //this.refs.modal.close();
  }

  open(){
    this.setState({modalVisible: true});
  }

  _onDateChange(date){
    this.setState({date: date});
    console.log(date);
  }

  _applySelectDate(){
    // 参考
    // let d=this.state.date;
    // let dformat = [d.getFullYear(),
    //         d.getMonth()+1,
    //          d.getDate()].join('-')+' '+
    //         [d.getHours(),
    //          d.getMinutes()].join(':');
    //这里先转换好 年月日
    const d = this.state.date;
    const Month = (d.getMonth() + 1) > 9 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1);
		const Date = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
    const select_date = d.getFullYear() + "-" + Month + "-" + Date;
    this.props.onSubmit(select_date);
    this.setState({modalVisible: false});
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor:'rgba(0, 0, 0, 0.3)',
  },
  calendarMain:{
    backgroundColor:'#ffffff',
    borderTopWidth: 0.5,
    borderTopColor: '#ccc',
    height:250,
    top:deviceScreen.height-250,
    right:0,
    left:0,
    position: 'absolute',
  },
  calendarHeader: {
    flexDirection:'row',
    alignItems:'center',
    height: 40,
    justifyContent: 'space-between',
    paddingLeft:30,
    paddingRight:30,
    paddingTop:10,
    backgroundColor:'#F2F2F2',
  },
  calendar: {
    height:60,
    justifyContent: 'center',
    flexDirection:'row',
    marginTop:20,
  },
  datePicker:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'#FFF',
  },
  textStyle:{
    fontSize:20,
    fontWeight:'500',
    textAlign: 'center',
    color:'#ff8c00',
  }
});
