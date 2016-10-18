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
      <ScrollView
        style={styles.scroll}
        refreshControl={<RefreshControl
            refreshing={false}
            onRefresh={this.props.onRefresh}
            tintColor="#ff0000"
            title="数据加载中..."
            titleColor="#000"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#000"
          />}
        >
        <View style={styles.EmptyView}>
        <Icon name="ios-warning-outline" size={100} color="#3F465A" />
        <Text>没有数据</Text>
        </View>
      </ScrollView>
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
      height: height-150,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
