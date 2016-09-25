'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

class Menu extends Component {
  _changeTab(tab){
    this.props.SelectTab(tab);
  }
  render(){
    return (
      <View style={styles.drawer}>
      <StatusBar
          translucent={true}
          backgroundColor="rgba(0, 0, 0, 0.2)"
          barStyle="light-content"
         />
         <View>
         <Image
          style={styles.header}
          source={require('../Images/drawer-header.png')}>
          <View>
            <TouchableHighlight onPress={this.openProfileSettings}>
                <Image
                  source={require('../Images/man.jpg')}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 20,
                  }}
                />
            </TouchableHighlight>
            <Text style={styles.name}>
              初见
            </Text>
          </View>
        </Image>
        </View>
      
        <View style={styles.contentView}>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <TouchableHighlight
            underlayColor='#A8CEBF'
            onPress={() => this._changeTab('TaskConstanter')}>
            <View style={styles.menuItem}>
              <Icon name="ios-cog" size={26} color='#000' /><Text style={{marginLeft:15,fontSize:16,}}>我的任务</Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight
            underlayColor='#A8CEBF'
            onPress={() => this._changeTab('ProjectConstanter')}>
            <View style={styles.menuItem}>
              <Icon name="ios-cog" size={26} color='#000' /><Text style={{marginLeft:15,fontSize:16,}}>我的项目</Text>
            </View>
            </TouchableHighlight>

            <TouchableHighlight
            underlayColor='#A8CEBF'
            onPress={() => this._changeTab('MyWork')}>
            <View style={styles.menuItem}>
              <Icon name="ios-cog" size={26} color='#000' /><Text style={{marginLeft:15,fontSize:16,}}>我的工作</Text>
            </View>
            </TouchableHighlight>


            <TouchableHighlight
            underlayColor='#A8CEBF'
            onPress={() => this._changeTab('Message')}>
            <View style={styles.menuItem}>
              <Icon name="ios-cog" size={26} color='#000' /><Text style={{marginLeft:15,fontSize:16,}}>我的消息</Text>
            </View>
            </TouchableHighlight>
          </ScrollView>
        </View>
        <View style={styles.bottomView}>
          <View>
            <Text>版本号:1.0.0</Text>
          </View>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Icon name="ios-cog" size={32} color='#000' />
            <Text>设置</Text>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  contentContainer: {
      paddingVertical: 20
    },
  drawer: {
    flex: 1,
    //backgroundColor: 'white',
  },
  header: {
    padding: 20,
    justifyContent: 'flex-end',
    alignItems:'center',
    height:200,
  },
  contentView: {
    flex:1,
  },
  menuItem: {
    //backgroundColor: '#eee',
    paddingLeft:20,
    height:46,
    justifyContent: 'flex-start',
    alignItems:'center',
    flexDirection:'row',
    borderBottomWidth:0.5,
    borderBottomColor:'#eee',
  },
  bottomView: {
    //backgroundColor:'#333',
    padding:20,
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection:'row',
  }
});

export default Menu;
