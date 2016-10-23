'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  Image,
  ListView,
  RefreshControl,
  Platform,
  TouchableHighlight,
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'
import Modal from 'react-native-modalbox'

export default class Message extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    }
  }

  _renderRow(){
    return (<TouchableHighlight onPress = {
            () => {this.refs.modal2.open()}
        }
        underlayColor = "#A8CEBF" >
        <View style = {styles.Item}>
          <View>
          <View style={styles.unRead}></View>
            {/**头像图标*/}
            <Image
		          style={styles.face}
		            source={require('../../Images/woman.jpg')}
		          />
          </View>
          <View style={styles.ItemContent}>
          {/*右边栏内容显示**/}
            <View style={styles.ItemContentLeft}>
              <View style={styles.ItemContentNameDate}>
                <Text style={styles.messageTypeText}>任务通知</Text>
              </View>
              <View style={styles.ItemContentTitle}>
                <Text style={styles.messageTitleText}>标题标题</Text>
              </View>
            </View>
          </View>
        </View>
        </TouchableHighlight>);
  }

_onRefresh(){

}
  render(){
    const rightButtonConfig = {
      title: '增加',
      handler: () => {},
    };
    return(
      <View style={{flex:1}}>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        tintColor={'#3F465A'}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        title={{title: '我的消息',tintColor:'#FFF'}}
        //rightButton={rightButtonConfig}
        leftButton={Platform.OS==='android'?<View style={{alignItems:'center',justifyContent: 'center',marginLeft:10,}}><Icon name="ios-menu" size={32} color='#FFF' onPress={() => this.props.onPress()}  /></View>:<View/>}
        />
        <ListView
                  automaticallyAdjustContentInsets={false}
                  enableEmptySections={true}
                  initialListSize={10}
                  dataSource={this.state.dataSource.cloneWithRows([1,2])}
                  renderRow={()=>this._renderRow()}
                  refreshControl={
                            <RefreshControl
                                refreshing={false}
                                onRefresh={() => this._onRefresh()}
                                tintColor="#ff0000"
                                title="数据加载中..."
                                colors={['#ff0000', '#00ff00', '#0000ff']}
                                progressBackgroundColor="#ffff00"
                                />}
                />

                <Modal style={[styles.modal, styles.modal2]} backdrop={true}  position={"bottom"} ref={"modal2"} swipeToClose={true} isDisabled={false}>
                  <Text style={[styles.text, {color: "white"}]}>Modal on top</Text>
                </Modal>
      </View>
    );
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
    },
    messageTypeText: {
      fontSize:17,
      color:'#000',
    },
    messageTitleText: {
      fontSize: 14,
      color:'#ccc',
    }
});
