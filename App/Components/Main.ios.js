import React,{ Component } from 'react';
import {
  View,
  Text,
  TabBarIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import Loading from './Common/loading'
import Profile from './User/Profile'
import LeftButton from './Common/LeftButton'

import TaskIndexConstanter from '../Constants/TaskIndexConstanter'
import ProjectConstanter from '../Constants/ProjectConstanter'
import MyWork from './Myworks/MyWork'
import Message from './Message/Message'


class Main extends Component {
  constructor(props) {
          super(props);
          this.state = {
              selectedTab: '任务',
          }
      }
      render() {
          return (<TabBarIOS selectedTab = {
              this.state.selectedTab
          }
              tintColor="#ff7f50">

              <Icon.TabBarItemIOS
                  title="消息"
                  iconName="ios-mail-outline"
                  selectedIconName="ios-mail"
                  selected={this.state.selectedTab === 'message'}
                  onPress={() => {
                      this.setState({
                          selectedTab: 'message',
                      });
                  } }>
                  <Message {...this.props} />
              </Icon.TabBarItemIOS>

              <Icon.TabBarItemIOS
                  iconName="ios-list-box-outline"
                  selectedIconName="ios-list-box"
                  title = '任务'
                  accessibilityLabel = "Blue Tab"
                  selected = {
                      this.state.selectedTab === '任务'
                  }
                  onPress = {
                      () => {
                          this.setState({
                              selectedTab: '任务',
                          });
                      }
                  }>
                  <TaskIndexConstanter {...this.props}/>
              </Icon.TabBarItemIOS>
{/*
              <Icon.TabBarItemIOS
                  title="项目"
                  iconName="ios-browsers-outline"
                  selectedIconName="ios-browsers"
                  selected={this.state.selectedTab === 'profile'}
                  onPress={() => {
                      this.setState({
                          selectedTab: 'profile',
                      });
                  } }>
                  <ProjectConstanter {...this.props}/>
              </Icon.TabBarItemIOS>
*/}
              <Icon.TabBarItemIOS
                  title="工作"
                  iconName="ios-keypad-outline"
                  selectedIconName="ios-keypad"
                  selected={this.state.selectedTab === 'work'}
                  onPress={() => {
                      this.setState({
                          selectedTab: 'work',
                      });
                  } }>
                  <MyWork {...this.props} />
              </Icon.TabBarItemIOS>

              <Icon.TabBarItemIOS
                  title="我的"
                  iconName="ios-contact-outline"
                  selectedIconName="ios-contact"
                  selected={this.state.selectedTab === 'settings'}
                  onPress={() => {
                      this.setState({
                          selectedTab: 'settings',
                      });
                  } }>
                  <Profile {...this.props} />
              </Icon.TabBarItemIOS>
          </TabBarIOS>
          );
      }
}

export default Main;
