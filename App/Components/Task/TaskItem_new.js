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
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment().locale('zh-cn');

class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0.9,
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

        return (<TouchableHighlight onPress = {
                () => {this.props.onPress()}
            }
            underlayColor = "#A8CEBF" >
            <View style = {styles.Item}>
              <View style = {styles.ItemHead}>
                {this._picpath()}
                <View style = {styles.TaskPublisher}><Text>{Task.t_creatorName}</Text><Text>9月26日 12:12:12 iphone</Text></View>
                <View style = {styles.ItemTaskStatus}><Text>任务-处理中</Text><Text>0/4</Text></View>
              </View>
              <View style = {styles.ItemContent}>
                <View style = {styles.TaskTitle}><Text>我是标题，标题，标题</Text></View>
                <View style = {styles.TaskContent}><Text>我是标题，标题，标题</Text></View>
              </View>
              <View style={styles.ItemToolBar}>
              <Text>我是工具栏</Text>
              </View>

            </View>
            </TouchableHighlight>);
    }

}

const styles = StyleSheet.create({
    face: {
        width: 38,
        height: 38,
        borderRadius: 20,
        //marginLeft:10,
        marginRight:10,
    },
    //单个ITEM的VIEW
    Item: {
      //justifyContent: 'center',
      //alignItems:'center',
      flex:1,
      flexDirection:'column',
      backgroundColor: '#0E0',
      marginBottom:15,
    },
    //ITEM的最上部分,指定高度
    ItemHead: {
      flex: 1,
      padding:10,
      flexDirection:'row',
      alignItems:'center',
      justifyContent: 'center',
      backgroundColor: '#ccc',
    },
    //头部中间的view,使用flex，
    TaskPublisher: {
      flex:1,
      backgroundColor: '#EEE',
      alignItems:'flex-start',

    },
    ItemTaskStatus: {
      width: 100,
      alignItems:'flex-start',
      backgroundColor: '#EEF',
    },
    ItemContent:{
      flex:1,
      //alignItems: 'flex-start',
      flexDirection:'column',
    //  alignItems:'center',
    },
    TaskTitle: {
      alignItems: 'flex-start',
    }
});

export default TaskItem;
