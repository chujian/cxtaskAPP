'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  InteractionManager,
  Text,
  ListView,
  RefreshControl,
  Platform,
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'
import { SwipeListView } from 'react-native-swipe-list-view';

import {fetchProject} from '../../Actions/projectActions'

import ProjectItem from './ProjectItem'

import ProjectAddConstanter from '../../Constants/ProjectAddConstanter'

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Project extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  _toProjectAdd(){
    const {navigator} = this.props;
    //InteractionManager.runAfterInteractions(()=>{
      navigator.push({
        name: 'ProjectAdd',
        component: ProjectAddConstanter,
      })
    //})
  }

  _onRefresh(){
    this.componentWillMount();
  }

  componentWillMount() {
    InteractionManager.runAfterInteractions(() => {
      const {dispatch,user,project}  = this.props;
      dispatch(fetchProject(user.userInfo.LOGINID,user.token));
    })
  }


  componentWillReceiveProps(nextProps) {
    const {dispatch,user,project}  = this.props;
    if(this.props.project.isRefresh !== nextProps.project.isRefresh && nextProps.project.isRefresh) {
      InteractionManager.runAfterInteractions(() => {
        this._onRefresh();
      });
      //console.log('自动-刷新项目列表');
    }
  }

  render(){
    const {user,project}  = this.props;
//    console.log('project===='+project.projectList.total);
    let source = dataSource.cloneWithRows(project.projectList.data);

    const rightButtonConfig = {
      title: '增加',
      tintColor:'#FFF',
      handler: () => this._toProjectAdd(),
    };
    return(
      <View style={styles.container}>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        tintColor={'#3F465A'}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        title={{title: '我的项目',tintColor:'#FFF'}}
        rightButton={rightButtonConfig}
        leftButton={Platform.OS==='android'?<View style={{alignItems:'center',justifyContent: 'center',marginLeft:10,}}><Icon name="ios-menu" size={32} color='#FFF' onPress={() => this.props.onPress()}  /></View>:<View/>}
        />

        <ListView
              enableEmptySections={true}
              automaticallyAdjustContentInsets={false}
              ref='ProjectLists'
              dataSource={source}
              renderRow={(Project) => {
                return (
                  <ProjectItem project={Project} navigator={this.props.navigator} />
                );
              }}
              refreshControl={
                        <RefreshControl
                            refreshing={project.isFetching}
                            onRefresh={() => this._onRefresh()}
                            tintColor="#ff0000"
                            title="数据加载中..."
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                            />}
            />
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

export default Project;
