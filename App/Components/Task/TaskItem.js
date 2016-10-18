import React, {
    Component
} from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    PixelRatio,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Mater from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment().locale('zh-cn');

const {Wheight, Wwidth} = Dimensions.get('window');

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _picpath(){
      if(this.props.task.picpath.substr(0,4) == 'http') {
        return(<Image
		        style={styles.face}
		        source={{uri: this.props.task.picpath}}
		      />);
          }else{
            return(<Image
		        style={styles.face}
		        source={this.props.task.picpath === "woman.jpg"?require('../../Images/woman.jpg'):require('../../Images/man.jpg')}
		      />);
        }
      }

    render() {
        let Task = this.props.task;
        let unReadBG = {backgroundColor: 'transparent'};
        if(Task.t_unRead === '1' || Task.part_unRead === '1') {
          unReadBG = {backgroundColor: 'red'};
        }
        //处理任务状态
        let taskStatus = '';
        let myTaskStatus = '';//我的任务状态

        myTaskStatus = Task.task_parter_status >= 3 ? '我已完成' : '';

        if(Task.t_status === '1') {
          taskStatus = '未处理';
        }else if(Task.t_status === '2') {
          taskStatus = '处理中';
        }else {
          taskStatus = '已完成';
        }

        taskStatus = (taskStatus !== '已完成' && myTaskStatus === '我已完成') ? myTaskStatus : taskStatus;

        return (<TouchableHighlight
                style={styles.container}
                onPress = {
                () => {this.props.onPress()}
            }
            underlayColor = "#A8CEBF" >
            <View style = {styles.Item}>
              <View style = {styles.ItemHead}>
                {this._picpath()}
                <View style = {styles.TaskPublisher}><Text style={styles.creatorName}>{Task.t_creatorName}</Text><Text style={{fontSize:13,color:'#CCC',paddingTop:5}}>{moment(Task.t_createTime).format("MMMDo hh:mm:ss")} 来自iphone</Text></View>
                <View style = {styles.ItemTaskStatus}><Text style={{fontSize:13,color:'#89CBC1'}}>任务-{taskStatus}</Text><Text style={{fontSize:12,color:'#ccc'}}>{Task.parterCompletedTotal}/{Task.parterTotal}</Text></View>
              </View>
              <View style = {styles.TaskTitleView}><Text style={styles.TaskTitle}>{Task.t_levelid === '3' ? '!!!' : ''}{Task.t_title}</Text></View>
              <View style = {styles.TaskTitleView}><Text style={styles.TaskContent}>{Task.t_notes === '' ? '无任务内容' : Task.t_notes}</Text></View>
              <View style = {styles.TaskParterView}><Text style={styles.TaskParterText}><Icon name="ios-people" size={15} color='#A8CEBF'/> {Task.t_partername === '' ? '无' : Task.t_partername}</Text></View>
              <View style = {styles.TaskContentView}><Text style={styles.TaskParterText}><Icon name="ios-time" size={15} color='#A8CEBF'/> {Task.t_endDate}</Text></View>

              <View style={styles.ItemToolBarView}>
                <View style={[styles.ItemToolBar,{borderRightWidth:0.5,borderColor:'#CCC'}]}><Icon name="ios-text-outline" size={20} color='#ccd'/><Text style={{fontSize:12,paddingLeft:5,color:'#ccd'}}>{Task.commentCount !== 0 ? Task.commentCount : '回复'}</Text></View>
                <View style={[styles.ItemToolBar,{borderRightWidth:0.5,borderColor:'#CCC'}]}><Icon name="ios-heart-outline" size={18} color='#ccd'/><Text style={{fontSize:12,paddingLeft:5,color:'#ccd'}}>赞</Text></View>
                <View style={styles.ItemToolBar}><Text style={{fontSize:12,paddingLeft:5,color:'#ccd'}}>... 更多</Text></View>
              </View>

            </View>
            </TouchableHighlight>);
    }

}

const styles = StyleSheet.create({
  container: {
    marginBottom:15,
  },
  face: {
        width: 38,
        height: 38,
        borderRadius: 5,
        marginRight:10,
    },
    //单个ITEM的VIEW
    Item: {
      flex:1,
      backgroundColor: '#FFFFFF',
      borderBottomColor: '#CCC',
      borderBottomWidth: 0.5,

      //borderTopColor: '#CCC',
      //borderTopWidth: 0.5,
      //marginBottom:15,
    },
    //ITEM的最上部分,指定高度
    ItemHead: {
      flex: 1,
      //padding:10,
      paddingLeft:15,
      paddingRight:15,
      paddingTop:10,
      paddingBottom:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'center',
    },
    //头部中间的view,使用flex，
    TaskPublisher: {
      flex:1,
      alignItems:'flex-start',
    },
    //任务发布人姓名
    creatorName: {
      fontSize: 16,
    },
    //任务状态
    ItemTaskStatus: {
      width: 100,
      alignItems:'flex-end',
    },
    //任务标题View
    TaskTitleView: {
      padding:10,
      justifyContent: 'center',
      alignItems:'flex-start',
      flexWrap: 'wrap',
    },
    //任务标题字体
    TaskTitle: {
      fontSize:15,
      flex:1,
    },
    //任务的内容view
    TaskContentView: {
      flexDirection:'column',
      borderBottomColor: '#F1F1F1',
      borderBottomWidth: 0.5,
      padding:15,
      paddingTop:5,
    },
    //任务内容
    TaskContent: {
      fontSize: 15.5,
      color:'#8F8F97',
      lineHeight: 20,
      flex:1,
    },
    TaskParterView: {
      justifyContent: 'flex-start',
      alignItems:'center',
      flexDirection: 'row',
      paddingLeft:20,
    },
    TaskParterText: {
      fontSize:11,
      color:'#ccc',
    },
    ItemToolBarView: {
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'space-between',
      height:48,
      padding:15,
    },
    ItemToolBar: {
      flex:1,
      width: Wwidth/3,
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'center',
    }
});

export default TaskItem;
