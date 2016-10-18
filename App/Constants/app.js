import React,{ Component } from 'react'

import {
  StyleSheet,
  Navigator,
  Platform,
  Alert,
  AsyncStorage,
} from 'react-native';

import {userLogin,userLoginFail} from '../Actions/userActions';

import LoginConstanter from './LoginConstanter';
import Main from '../Components/Main';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  //componentDidMount(){
  componentWillMount(){
    //this._updateAPP();
    //JPushModule.initPush();
    /*
    JPushModule.getInfo((map) => {
      console.log('map.key'+map.myPackageName);
      this.setState({
            appkey: map.myAppKey,
            imei: map.myImei,
            package: map.myPackageName,
            deviceId: map.myDeviceId,
            version: map.myVersion
      });
    });
    */
  }

  componentDidMount() {
/*
    console.log('appkey=='+this.state.appkey);
      JPushModule.addReceiveCustomMsgListener((message) => {
        this.setState({pushMsg: message});
      });
      JPushModule.addReceiveNotificationListener((message) => {
        console.log("receive notification: " + message);
      })
      */
    }

  componentWillUnmount() {
    /*
    JPushModule.removeReceiveCustomMsgListener();
    JPushModule.removeReceiveNotificationListener();
    */
  }

  renderScene(route, navigator) {
    let Component = route.component
    return (
      <Component navigator={navigator} route={route} {...route.params} />
    )
  }

  configureScene(route) {
    console.log('当前route='+route.name);
    if (route.name && route.name === 'Main') {
      return Navigator.SceneConfigs.FadeAndroid
    } else if(route.name === 'TaskAdd') {
      return Navigator.SceneConfigs.FloatFromBottom
    } else if (route.name === 'CommentAdd') {
      return Navigator.SceneConfigs.FloatFromBottom
    } else {
      return Navigator.SceneConfigs.PushFromRight
    }
  }

  render() {
    return (
      <Navigator
        ref='navigator'
        style={styles.navigator}
        configureScene={this.configureScene}
        renderScene={this.renderScene}
        initialRoute={{
          component: LoginConstanter,
          name: 'Login'
        }}
      />
    )
  }
}

let styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
})

export default App;
