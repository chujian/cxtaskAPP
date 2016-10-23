import React,{Component} from 'react'
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-modalbox'
import Icon from 'react-native-vector-icons/Ionicons'

export default class TaskHandlerModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  open(){
    this.refs.modal.open();
  }
  _close(){
    this.setState({isOpen: false});
  }
    render() {
        return (
          <Modal style={styles.modal}
              backdrop={true}
              position={"bottom"}
              ref={"modal"}
              swipeToClose={false}
              isOpen={this.state.isOpen}>
            <View style={styles.handler_more}><Text style={{color:'#898989'}}>更多操作</Text></View>
            <View style={{flex:1,flexDirection:'row',}}>
              <View style={styles.item}>
                <View style={styles.itemIcon}><Icon name="ios-star-outline" size={32} color='#3F465A' /></View>
                <Text>收藏</Text>
              </View>

              <View style={styles.item}>
                <View style={styles.itemIcon}><Icon name="ios-trash-outline" size={32} color='#3F465A' /></View>
                <Text>删除</Text>
              </View>

            </View>
            <TouchableOpacity onPress={()=>this._close()}>
            <View style={styles.handler_cancel}><Text>取消</Text></View>
            </TouchableOpacity>
          </Modal>
        );
    }
}

const styles = StyleSheet.create({
  modal: {
    //justifyContent: 'center',
    //alignItems: 'center'
    height: 200,
    backgroundColor: "#F2F2F2",
  },
  handler_more: {
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handler_cancel: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 0.5,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
  },
  itemIcon: {
    height: 50,
    width: 50,
    borderRadius: 10,
    marginBottom:10,
    backgroundColor:'#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
