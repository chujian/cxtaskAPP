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
		        source={this.props.task.picpath === "woman.jpg"?require('../Images/woman.jpg'):require('../Images/man.jpg')}
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
              <View>
              <View style={[styles.unRead,unReadBG]}></View>
                {/**头像图标*/}
                {this._picpath()}
              </View>
              <View style={styles.ItemContent}>
              {/*右边栏内容显示**/}
                <View style={styles.ItemContentLeft}>
                  <View style={styles.ItemContentNameDate}>
                    <View>
                      <Text style={styles.Issuer}>{Task.t_creatorName === this.props.User.userInfo.LASTNAME?"我":Task.t_creatorName}</Text>
                    </View>
                    <View>
                      <Text style={{fontSize:12,color:'#636363',}}>{moment(Task.t_createTime).startOf('minute').fromNow()}</Text>
                    </View>
                  </View>
                  <View style={styles.ItemContentTitle}>
                    <Text style={styles.Title}>{Task.t_title.substr(0,20)}</Text>
                  </View>
                </View>
                {/**
                <Icon name="ios-arrow-forward-outline" size={24} color='#E3E3E3' />*/}
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
        marginLeft:10,
    },
    Item: {
      justifyContent: 'space-between',
      alignItems:'center',
      flexDirection:'row',
      backgroundColor: '#FFF',
    },
    ItemContent:{
      flex:1,
      justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
      //marginLeft:10,
      //marginRight:10,
      padding:0,
    },
    ItemContentLeft: {
      flexDirection:'column',
      flex:1,
      justifyContent: 'center',
    //  backgroundColor:'#ccc',
      padding:5,
    },
    ItemContentTitle: {
      height:35,
      justifyContent: 'center',
      //backgroundColor:'#c0c',
    },
    ItemContentNameDate: {
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems:'center',
      padding:1,
      //backgroundColor:'#ccc',
    },
    Issuer: {
      fontSize:17,
      color:'#000',
    },
    Title: {
      fontSize:14,
      color:'#9BA3A0',
    },
    unRead: {
      width: 10,
      height: 10,
      right:0,
      top:-5,
      borderRadius: 20,
      //backgroundColor:'red',
      position: 'absolute',
    }
});

export default TaskItem;
