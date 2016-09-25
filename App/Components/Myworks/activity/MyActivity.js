'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  ListView,
  RefreshControl,
  TouchableHighlight,
  Platform,
  Image,
} from 'react-native'
import {fetchActivity} from '../../../Actions/activityActions'

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'
import ActivityItem from './ActivityItem'

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class MyActivity extends Component {
  componentWillMount(){
    this._onRefresh();
  }

  _onRefresh() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch}  = this.props;
      const {token,userInfo} = this.props.user;
      dispatch(fetchActivity(userInfo.LOGINID,token));
    });
  }

  render(){
    const {user,activity} = this.props;
    let source = dataSource.cloneWithRows(activity.activityList.data);

    return(
      <View style={styles.container}>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        tintColor={'#34b2e5'}
        statusBar={{style:'default',showAnimation:'slide'}}
        title={{title: '我的义诊活动'}}
        leftButton={<View style={{alignItems:'center',justifyContent: 'center',marginLeft:10,}}><Icon name="ios-arrow-dropleft" size={32} color='#FFF' onPress={() => this.props.navigator.pop()}  /></View>}
        />
        <ListView
              enableEmptySections={true}
              automaticallyAdjustContentInsets={false}
              ref='ActivityLists'
              dataSource={source}
              renderRow={(Activity) => {
                return (
                  <ActivityItem activity={Activity} {...this.props} />
                );
              }}
              refreshControl={
                        <RefreshControl
                            refreshing={activity.isFetching}
                            onRefresh={() => this._onRefresh() }
                            colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                            progressBackgroundColor="#fff"
                            />}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F2',
    },
});

export default MyActivity;
