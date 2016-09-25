'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Platform,
} from 'react-native';
import NavigationBar from 'react-native-navbar'

import {addTaskNote} from '../Actions/taskActions'

import LeftButton from './LeftButton'

class TaskNote extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskNote: '',
    }
  }

  _noteCancel(){
    this.props.navigator.pop();
  }

  //添加备注
  _noteAdd() {
    const {dispatch,navigator} = this.props
    dispatch(addTaskNote(this.state.taskNote));
    navigator.pop();
  }

  componentWillMount(){
    const {taskNote} = this.props.newTask
    if(taskNote !== '任务备注') {
      this.setState({taskNote: taskNote});
    }
  }
  render(){
    const rightButtonConfig = {
      title: '保存',
      handler: () => this._noteAdd(),
      tintColor: '#EEE'
    }
    return(
      <View style={styles.note}>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        tintColor={'#34b2e5'}
        title={{title: '发布任务'}}
        rightButton={rightButtonConfig}
        leftButton={<LeftButton onPress={()=>this._noteCancel()} />}
        />

        <TextInput
          style={styles.noteInput}
          placeholder='任务内容'
          underlineColorAndroid='transparent'
          onChangeText={(text) => this.setState({taskNote: text})}
          value={this.state.taskNote}
          autoFocus={true}
          multiline={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  note:{
    flex:1,
    backgroundColor:'#fff'
  },
  noteInput: {
    textAlignVertical: "top",
    height: 300,
    padding:5,
    fontSize: 18,
  }
});

export default TaskNote;
