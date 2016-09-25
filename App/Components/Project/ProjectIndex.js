import React,{ Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TabBarIOS,
  Platform,
} from 'react-native';

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons';
import LeftButton from '../LeftButton'

export default class ProjectIndex extends Component {
    // 构造
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _closeProject(){
      this.props.navigator.pop();
    }

    render(){
      return(
        <View style={styles.container}>
        <NavigationBar
          style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
          tintColor={'#34b2e5'}
          statusBar={{style:'light-content',showAnimation:'slide'}}
          title={{title: '我的消息'}}
          //rightButton={rightButtonConfig}
          leftButton={<LeftButton onPress={()=>this._closeProject()} />}
          />
        <View style={styles.ProIndex}>
          <View style={styles.ProRecomm}>
            <Text>项目名称 说明</Text>
          </View>
          <View style={styles.ProParter}>
            <View style={styles.Parter}><Text>名字</Text></View>
            <View style={styles.Parter}><Text>名字</Text></View>
          </View>
        </View>
        <View style={styles.ProjectLog}>
        </View>

        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
          backgroundColor: '#fff',
    },
    ProIndex: {

    },
    ProRecomm: {

    },
    ProParter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Parter: {
      height:38,
      width:38,
      borderRadius:19,
      backgroundColor:'#e0e',
      margin:2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ProjectLog: {
      
    }
});
