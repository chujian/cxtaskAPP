import React, {
    Component
} from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ScrollView,
    Platform,
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'


export default class Reminder extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    _changeLevel(level){
      const {dispatch,task,navigator} = this.props
      dispatch(changeTaskLevel(level));
      navigator.pop();
    }

    render(){
      const arrowIcon = (<Icon name="ios-checkmark-outline" size={24} color='blue' />);
      return(
        <View style={styles.container}>
        <NavigationBar
          style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
          statusBar={{style:'light-content',showAnimation:'slide'}}
          tintColor={'#3F465A'}
          title={{title: '选择提醒时间',tintColor:'#FFF'}}
          leftButton={<View style={{alignItems:'center',justifyContent: 'center',marginLeft:20,flexDirection:'row',}}><Icon name="ios-arrow-back" size={32} color='#FFF' /><Text onPress={() => this.props.navigator.pop()} style={{color:'#fff',marginLeft:10}}>返回</Text></View>}
          />
        <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.List}>
        <TouchableHighlight onPress = {() => this._changeLevel('普通')}
            underlayColor = "#A8CEBF" >
        <View style={styles.Item}>
          {/*icon view*/}
          <View style={styles.ItemIcon}>
            <Icon name="ios-megaphone-outline" size={32} />
          </View>
          {/*ItemContent*/}
          <View style={[styles.ItemContent,{borderBottomColor: '#ccc',borderBottomWidth: 0.5,}]}>
            <Text>该任务结束时</Text>
            {/*task.taskNew.taskLevel === '普通' ? <Icon name="ios-checkmark-outline" size={24} color='blue' />:null*/}
          </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this._changeLevel('重要又紧急')}
            underlayColor = "#A8CEBF" >
        <View style={styles.Item}>
          {/*icon view*/}
          <View style={styles.ItemIcon}>
            <Icon name="ios-megaphone-outline" size={32} color='#d2691e' />
          </View>
          {/*ItemContent*/}
          <View style={[styles.ItemContent,{borderBottomColor: '#ccc',borderBottomWidth: 0.5,}]}>
            <Text style={{color:'#d2691e'}}>5分钟前</Text>
            {/*task.taskNew.taskLevel === '重要又紧急' ? <Icon name="ios-checkmark-outline" size={24} color='blue' />:null*/}
          </View>
        </View>
        </TouchableHighlight>
        <TouchableHighlight onPress = {() => this._changeLevel('重要不紧急')}
            underlayColor = "#A8CEBF" >
        <View style={styles.Item}>
          {/*icon view*/}
          <View style={styles.ItemIcon}>
            <Icon name="ios-megaphone-outline" size={32} color='red' />
          </View>
          {/*ItemContent*/}
          <View style={[styles.ItemContent,{borderBottomColor: '#ccc',borderBottomWidth: 0.5,}]}>
            <Text style={{color:'red'}}>15分钟前</Text>
            {/*task.taskNew.taskLevel === '重要不紧急' ? <Icon name="ios-checkmark-outline" size={24} color='blue' />:null*/}
          </View>
        </View>
        </TouchableHighlight>

        <TouchableHighlight onPress = {() => this._changeLevel('紧急不重要')}
            underlayColor = "#A8CEBF" >
        <View style={styles.Item}>
          {/*icon view*/}
          <View style={styles.ItemIcon}>
            <Icon name="ios-megaphone-outline" size={32} color='red' />
          </View>
          {/*ItemContent*/}
          <View style={[styles.ItemContent,{borderBottomColor: '#ccc',borderBottomWidth: 0.5,}]}>
            <Text style={{color:'red'}}>30分钟前</Text>
            {/*task.taskNew.taskLevel === '紧急不重要' ? <Icon name="ios-checkmark-outline" size={24} color='blue' />:null*/}
          </View>
        </View>
        </TouchableHighlight>

        <TouchableHighlight onPress = {() => this._changeLevel('不紧急不重要')}
            underlayColor = "#A8CEBF" >
        <View style={styles.Item}>
          {/*icon view*/}
          <View style={styles.ItemIcon}>
            <Icon name="ios-megaphone-outline" size={32} color='red' />
          </View>
          {/*ItemContent*/}
          <View style={styles.ItemContent}>
            <Text style={{color:'red'}}>1小时前</Text>
            {/*task.taskNew.taskLevel === '不紧急不重要' ? <Icon name="ios-checkmark-outline" size={24} color='blue' />:null*/}
          </View>
        </View>
        </TouchableHighlight>

        </View>
        </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F8F8F8',
  },
  scroll:{
    padding:0,
  },
  List:{
    marginTop:10,
    borderBottomWidth:0.5,
    borderBottomColor:'#ccc',
    borderTopWidth:0.5,
    borderTopColor:'#ccc',
    backgroundColor: '#FFF',
  },
  Item: {
    justifyContent: 'space-between',
    alignItems:'center',
    flexDirection:'row',
  },
  ItemIcon: {
    marginLeft:10,
  },
  ItemContent: {
    height: 42,
    flex:1,
    marginLeft:10,
    paddingRight:40,
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
  }
});
