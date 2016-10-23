'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  ActivityIndicator,
  InteractionManager,
  TouchableOpacity,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
//import Toast, {DURATION} from 'react-native-easy-toast'
import Toast from 'react-native-root-toast';

import CommentAddConstanter from '../../Constants/CommentAddConstanter'
import {fetchCommentList,emptyCommentList,deleteComment} from '../../Actions/commentActions'

import CommentEmpty from '../Empty/CommentEmpty'

import moment from 'moment'
import 'moment/locale/zh-cn'

moment().locale('zh-cn');

export default class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount(){
    const {dispatch,taskId} = this.props
    const {token} = this.props.user
    InteractionManager.runAfterInteractions(() => {
      dispatch(fetchCommentList(taskId,token));
    });
  }

  componentWillUnmount(){
    const {dispatch} = this.props
    dispatch(emptyCommentList());
  }

  componentWillReceiveProps(nextProps) {
    const {dispatch,comment,taskId,user} = this.props;

    if(nextProps.comment.CommentResult === 'success') {
      //this.refs.toast.show('添加成功!',DURATION.LENGTH_SHORT);
      comment.Message === '' && (this.props.comment.Message === nextProps.comment.Message) ? null : Toast.show(comment.Message);
      InteractionManager.runAfterInteractions(() => {
        dispatch(fetchCommentList(taskId,user.token));
      });
    }
	}

  //删除评论(自己的)
  _delComment(commentId) {
    const {dispatch,user} = this.props;
    Alert.alert(
      '提示',
      '您确定要删除该评论吗?',
      [
        {text: '取消',},
        {text: '确定', onPress: () => {
          //这里和删除评论一致,先删除本地,然后发送请求给后台删除
          InteractionManager.runAfterInteractions(() => {
            dispatch(deleteComment(user.userInfo.LOGINID,user.token,commentId));
          });
        }
      },
      ]
    )
  }

  //打开评论添加界面
  _openCommentAdd(taskId,Poster){
    const {navigator} = this.props;

    navigator.push({
      name: "CommentAdd",
      component: CommentAddConstanter,
      params: {
        task_id: taskId,
        task_comment: '回复@'+Poster+": ",
      }
    });
  }

  render() {
    const {user,comment} = this.props;
    /*
    if(comment.isFetching) {
      return(
        <ActivityIndicator
        color="#e0e"
        size="small"
        animating={true}/>
      );
    }*/
    let ii=0
    return (
        <View style={styles.List}>
        <View style={styles.CommentCount}><Text style={{color:'#1e90ff',fontSize:15}}>回复({comment.List.length})</Text></View>
        {
          comment.List.length === 0 ? <CommentEmpty /> :
          comment.List.map((comment,key) => {
            ii++
            let source;
            if(comment.picpath.substr(0,4) === 'http') {
              source = {uri: comment.picpath}
            }else{
              source = comment.SEX === "0"?require('../../Images/man.jpg'):require('../../Images/woman.jpg')
            }
            return(
              <View style={styles.Item} key={key}>
                <View style={{paddingTop: 17}}>
                  <Image
                  style={styles.face}
                  source={source}
                  />
                </View>
                <View style={styles.ItemContent}>
                  <View style={styles.ItemFrom}>
                    <View>
                      <Text style={styles.FromFont}>
                      {comment.LASTNAME}({comment.Poster})
                      </Text>
                    </View>
                    <View style={styles.commentTool}>
                    {comment.Poster === user.userInfo.LOGINID && comment.from !== '来自系统 ' ?
                      <TouchableOpacity
                        onPress = {() => this._delComment(comment.id)}
                      >
                      <View style={styles.commentToolItem}><Icon name="ios-trash-outline" size={20} color='#cdd'/></View>
                      </TouchableOpacity>
                      : null
                    }
                      <View style={styles.commentToolItem}><Icon name="ios-thumbs-up-outline" size={20} color='#cdd'/></View>
                      <TouchableOpacity
                        onPress = {() => this._openCommentAdd(comment.task_id,comment.LASTNAME)}
                      >
                        <View style={styles.commentToolItem}><Icon name="ios-text-outline" size={20} color='#cdd'/></View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.ItemComment}><Text style={{fontSize:13,lineHeight:17}}>{comment.comment}</Text></View>
                  <View style={styles.ItemCommentFloor}><Text style={styles.CommentFloor}>{moment(comment.Post_dateTime).startOf('minute').fromNow()} {comment.from}</Text></View>
                </View>
              </View>
            );
          })
        }

        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    List:{
      //marginTop:30,
    //  borderBottomWidth:0.5,
    //  borderBottomColor:'#ccc',
      //borderTopWidth:0.5,
      //borderTopColor:'#ccc',
      backgroundColor: '#FFF',
      marginBottom:60,
    },
    CommentCount: {
      height: 40,
      backgroundColor:'#f5f5f5',
      justifyContent:'center',
      paddingLeft:10,
    },
    Item: {
      alignItems:'flex-start',
      flexDirection:'row',
      //flex:1,
    },
    ItemContent: {
    //  height: 42,
      flex:1,
      paddingLeft:10,
      paddingRight:10,
      flexDirection:'column',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
      //backgroundColor:'#eee',
    },
    face: {
      width: 32,
      height: 32,
      marginLeft:10,
      borderRadius: 5,
    },
    ItemComment:{
      padding:10,
    },
    ItemCommentFloor: {
      paddingBottom:5,
    },
    CommentFloor: {
      fontSize:12,
      color:'#ccc',
    },
    ItemAddress:{
      padding:10,
    },
    ItemFrom: {
      paddingTop:15,
      flex:1,
      flexDirection:'row',
      justifyContent: 'space-between',
    },
    FromFont:{
      fontSize: 12,
      color:'#696969'
    },
    commentTool: {
      flex:1,
      //backgroundColor:'#e0e',
      flexDirection:'row',
      justifyContent: 'flex-end',
    },
    commentToolItem: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 20,
    }
});
