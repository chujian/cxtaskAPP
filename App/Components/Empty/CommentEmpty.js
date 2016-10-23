'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  RefreshControl,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

const {height, width} = Dimensions.get('window');

export default class TaskEmpty extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return(
      <View>
        <View style={styles.EmptyView}>
        <Icon name="ios-filing-outline" size={100} color="#ccc" />
        <Text style={{color:'#ccc'}}>还没有任何回复</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        //backgroundColor: '#fff',
        flexDirection:'row',
    },
    EmptyView: {
      flex:1,
      //backgroundColor: '#00ff00',
      height: 200,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
