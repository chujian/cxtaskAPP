'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Platform,
    InteractionManager,
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import Toast from 'react-native-root-toast';

import {postComment,emptyCommentList} from '../../Actions/commentActions'

import LeftButton from '../Common/LeftButton'

class CommentAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskId: props.task_id,
      taskComment: props.task_comment === undefined ? '' : props.task_comment,
    }
  }

  _commentCancel(){
    this.props.navigator.pop();
  }

  //添加评论
  _commentAdd() {
    const {user,dispatch,navigator} = this.props;

    let postData = {
      comment_body: this.state.taskComment,
      task_id: this.state.taskId,
      post_from: Platform.OS === 'ios' ? '来自iphone' : '来自android',
      post_addr: '',
    }
    Toast.show('正在添加');
    dispatch(postComment(user.userInfo.LOGINID,this.state.taskId,user.token,postData));
    navigator.pop();
  }

  componentWillUnmount(){
    const {dispatch} = this.props
    dispatch(emptyCommentList());
  }

  render(){
    const rightButtonConfig = {
      title: '发布',
      handler: () => this._commentAdd(),
      tintColor: '#EEE'
    }
    const leftButtonConfig = {
      title: '取消',
      handler: () => this._commentCancel(),
      tintColor: '#EEE'
    }
    return(
      <View style={styles.note}>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        tintColor={'#3F465A'}
        title={{title: '回复',tintColor:'#FFF'}}
        rightButton={rightButtonConfig}
        leftButton={leftButtonConfig}
        />

        <TextInput
          style={styles.noteInput}
          placeholder='评论内容'
          underlineColorAndroid='transparent'
          onChangeText={(text) => this.setState({taskComment: text})}
          value={this.state.taskComment}
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

export default CommentAdd;
