'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  ActivityIndicator,
  InteractionManager,
} from 'react-native'
import {fetchCommentList,emptyCommentList} from '../Actions/commentActions'
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

  render() {
    const {commentList} = this.props.comment
    const {List} = this.props.comment.commentList
    if(commentList.isFetching) {
      return(
        <ActivityIndicator
        color="#e0e"
        size="small"
        animating={true}/>
      );
    }
    let ii=0
    return (
        <View style={styles.List}>
        {
          List.map((comment,key) => {
            ii++
            let source;
            if(comment.picpath.substr(0,4) === 'http') {
              source = {uri: comment.picpath}
            }else{
              source = comment.SEX === "0"?require('../Images/man.jpg'):require('../Images/woman.jpg')
            }
            return(
              <View style={styles.Item} key={key}>
                <View>
                  <Image
                  style={styles.face}
                  source={source}
                  />
                </View>
                <View style={styles.ItemContent}>
                  <View style={styles.ItemFrom}>
                    <View>
                      <Text style={styles.FromFont}>
                      {comment.LASTNAME}({comment.Poster}){comment.from}
                      </Text>
                    </View>
                  <Text>{moment(comment.Post_dateTime).startOf('minute').fromNow()}</Text>
                  </View>
                  <View style={styles.ItemComment}><Text>{comment.comment}</Text></View>
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
      marginTop:30,
    //  borderBottomWidth:0.5,
    //  borderBottomColor:'#ccc',
      borderTopWidth:0.5,
      borderTopColor:'#ccc',
      backgroundColor: '#FFF',
    },
    Item: {
      alignItems:'center',
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
      borderRadius: 16,
    },
    ItemComment:{
      padding:10,
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
    }
});
