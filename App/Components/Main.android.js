'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  ListView,
  RefreshControl,
  DrawerLayoutAndroid,
} from 'react-native'

import NavigationBar from 'react-native-navbar'

import Menu from './Menu'

import TaskIndexConstanter from '../Constants/TaskIndexConstanter'
import ProjectConstanter from '../Constants/ProjectConstanter'
import MyWork from './Myworks/MyWork'
import Message from './Message/Message'

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      RightView: 'TaskConstanter'
    }
  }

  _renderNavigationView(){
      return(<Menu {...this.props} SelectTab={(tab)=>this._onSelectTab(tab)}/>);
  }

  _onSelectTab(tab){
    this.setState({RightView: tab});
    this.refs.drawer.closeDrawer()
    console.log('tab===='+tab);
  }

  _onMenuClick(){
    this.refs.drawer.openDrawer()
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  render(){
    let right_view = null;
    if(this.state.RightView === 'TaskConstanter'){
      right_view=(<TaskIndexConstanter {...this.props} onPress={()=>this._onMenuClick()}/>);
    }else if(this.state.RightView === 'ProjectConstanter') {
      right_view=(<ProjectConstanter {...this.props} onPress={()=>this._onMenuClick()}/>);
    }else if(this.state.RightView === 'MyWork') {
      right_view=(<MyWork {...this.props} onPress={()=>this._onMenuClick()}/>);
    }else if(this.state.RightView === 'Message') {
      right_view=(<Message {...this.props} onPress={()=>this._onMenuClick()}/>);
    }
    return(
      <View style={styles.container}>
        <DrawerLayoutAndroid
          ref='drawer'
          drawerWidth={280}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={()=>this._renderNavigationView()}>
          {right_view}
    </DrawerLayoutAndroid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
});

export default Main;
