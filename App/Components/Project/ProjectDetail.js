import React,{ Component } from 'react';
import {
  View,
  Text,
  TabBarIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';


import ProjectIndex from './ProjectIndex'
import Message from '../Message/Message'


class ProjectDetail extends Component {
  constructor(props) {
          super(props);
          this.state = {
              selectedTab: '项目主页',
          }
      }
      render() {
          return (<TabBarIOS selectedTab = {
              this.state.selectedTab
          }
              tintColor="#e0e"
              barTintColor="#b0c4de">
              <Icon.TabBarItemIOS
                  iconName="ios-paper-outline"
                  selectedIconName="ios-paper-outline"
                  title = '项目主页'
                  accessibilityLabel = "Blue Tab"
                  selected = {
                      this.state.selectedTab === '项目主页'
                  }
                  onPress = {
                      () => {
                          this.setState({
                              selectedTab: '项目主页',
                          });
                      }
                  }>
                  <ProjectIndex {...this.props}/>
              </Icon.TabBarItemIOS>

              <Icon.TabBarItemIOS
                  title="项目任务"
                  iconName="ios-albums-outline"
                  selectedIconName="ios-albums"
                  selected={this.state.selectedTab === '项目任务'}
                  onPress={() => {
                      this.setState({
                          selectedTab: '项目任务',
                      });
                  } }>
                  <Message {...this.props}/>
              </Icon.TabBarItemIOS>
              <Icon.TabBarItemIOS
                  title="项目讨论"
                  iconName="ios-keypad-outline"
                  selectedIconName="ios-keypad"
                  selected={this.state.selectedTab === '项目讨论'}
                  onPress={() => {
                      this.setState({
                          selectedTab: '项目讨论',
                      });
                  } }>
                  <Message {...this.props} />
              </Icon.TabBarItemIOS>
          </TabBarIOS>
          );
      }
}

export default ProjectDetail;
