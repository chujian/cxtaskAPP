import React, {
    Component
} from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { SwipeListView,SwipeRow } from 'react-native-swipe-list-view';

import ProjectDetail from './Project/ProjectDetail'

class ProjectItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _openProject(){
      this.props.navigator.push({
        name: 'TaskDetail',
        component: ProjectDetail,
        params: {
        }
      });
    }
    render() {
        let Project = this.props.project;

        return (<TouchableHighlight onPress = {
                () => this._openProject()
            }
            underlayColor = "#A8CEBF" >
            <View style = {styles.Item}>
              <View>
                <Image
    		        style={styles.face}
    		        source={require('../Images/project.png')}
    		      />
              </View>
              <View style={styles.ItemContent}>
                <View style={styles.ItemContentLeft}>
                  <View style={styles.ItemContentNameDate}>
                    <View>
                      <Text style={styles.NameDate}>{Project.LASTNAME}</Text>
                    </View>
                    <View>
                      <Text style={styles.NameDate}>{Project.p_createTime.substr(0,10)}</Text>
                    </View>
                  </View>
                  <View style={styles.ItemContentTitle}>
                    <Text style={styles.Title}>{Project.p_title.substr(0,20)}</Text>
                  </View>
                </View>
                <Icon name="ios-arrow-forward-outline" size={24} color='#E3E3E3' />
              </View>
            </View>
            </TouchableHighlight>);
          }

}

const styles = StyleSheet.create({
    face: {
        width: 38,
        height: 38,
        marginLeft:10,
    },
    Item: {
      justifyContent: 'space-between',
      alignItems:'center',
      flexDirection:'row',
      backgroundColor: '#FFF',
    },
    ItemContent:{
      flex:1,
      justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
      marginLeft:10,
      marginRight:10,
    },
    ItemContentLeft: {
      flexDirection:'column',
      flex:1,
      justifyContent: 'center',
    //  backgroundColor:'#ccc',
      padding:5,
    },
    ItemContentTitle: {
      height:40,
      justifyContent: 'center',
      //backgroundColor:'#c0c',
    },
    ItemContentNameDate: {
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems:'center',
      padding:1,
      //backgroundColor:'#ccc',
    },
    NameDate: {
      fontSize:12,
      color:'#636363',
    },
    Title: {
      fontSize:14,
    },
    standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15
	},
  standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		justifyContent: 'center',
		height: 50,
	},
  backTextWhite: {
		color: '#FFF'
	},
});

export default ProjectItem;
