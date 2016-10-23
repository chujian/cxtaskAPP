'use strict'
import React,{Component} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

class LeftButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.container}>
            <Icon name="ios-arrow-dropleft" size={32} color="#FFF"/>
            {/**
            <Text style={{color:'#FFF',fontSize:16,marginLeft:8}}>返回</Text>
            **/}
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        //padding:10,
        //backgroundColor:'#eee',
        marginLeft:10,
        marginRight:10,
        top:5,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
});

export default LeftButton;
