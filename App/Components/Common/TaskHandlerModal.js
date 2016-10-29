import React,{Component} from 'react'
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import Modal from 'react-native-animated-modal'
import Icon from 'react-native-vector-icons/Ionicons'

export default class TaskHandlerModal extends Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
    }
  }

  open(){
    this.setState({visible: true});
  }
  _close(){
    this.setState({visible: false});
  }
    render() {
        return (
          <Modal
              style={styles.modal}
              ref={"modal"}
              animationOutTiming={300}
              isVisible={this.state.visible}
              onPressBackdrop={()=>this._close()}
              backdropOpacity={0.4}
              >
              <View style={{height:200,backgroundColor:'#fff'}}>
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

              <View style={styles.item}>
                <View style={styles.itemIcon}><Icon name="md-remove-circle" size={32} color='#3F465A' /></View>
                <Text>取消{this.props.taskModal.task_id} {this.props.user.token}</Text>
              </View>

            </View>
            <TouchableOpacity onPress={()=>this._close()}>
            <View style={styles.handler_cancel}><Text>取消</Text></View>
            </TouchableOpacity>
            </View>
          </Modal>
        );
    }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
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
    backgroundColor:'#F2F2F2',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
