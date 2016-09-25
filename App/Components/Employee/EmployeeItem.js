import React, {
    Component
} from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'

import EmployeeConstanter from '../../Constants/EmployeeConstanter'

class EmployeeItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _openWin(id){
      console.log('id==='+id);
      this.props.navigator.push({
        name:'Employee',
        component: EmployeeConstanter,
        params:{
          department: id,
        }
      });
    }

    _department(Employee){


      return(
        <TouchableHighlight onPress = {() => this._openWin(Employee.id)}
          underlayColor = "#A8CEBF" >
          <View style = {styles.Item}>
              <View style={styles.ItemIcon}>
                {/**选择图标
                {isSelected?<Icon name="ios-radio-button-off" size={32} color='#CCC'/>:<Icon name="ios-radio-button-on" size={32} color='green'/>}
                  */}
              </View>
                {/*右边栏内容显示**/}
              <View style={styles.ItemContent}>
                  <View style={styles.ItemHeadImage}>
                    {/**头像图标
                      <Image
                      style={styles.face}
                      source={require('../../Images/team.png')}/>*/}
                      <Icon name="ios-people" size={40} color='#8B92A0' />
                  </View>
                  <View style={{flex:1,justifyContent: 'space-between',flexDirection:'row',}}>
                    <View>
                      <Text style={styles.ItemEmployeeName}>{Employee.name} </Text>
                    </View>
                    <View style={{right:20,}}>
                      <Text style={styles.ItemEmployeePost}>[{Employee.departmenttypename}]</Text>
                    </View>
                  </View>
              </View>
              <Icon name="ios-arrow-forward-outline" size={24} color='#E3E3E3' />
          </View>
          </TouchableHighlight>
      );
    }

    _employee(Employee,isSelected){
      const {userInfo} = this.props
      let source;
      if(Employee.picpath !== '') {
        source = {uri: Employee.picpath}
      }else{
        source = Employee.sex === "0"?require('../../Images/man.jpg'):require('../../Images/woman.jpg')
      }

      //自己不能作为任务接收人,所以这里屏蔽显示自己
      if(userInfo.LOGINID === Employee.id) {
        return null;
      }

      return(<TouchableHighlight onPress = {
            () => this.props.onToggle()
        }
        underlayColor = "#FFF" >
        <View style = {styles.Item}>
            <View style={styles.ItemIcon}>
              {/**选择图标*/}
              {isSelected?<Icon name="ios-radio-button-off" size={32} color='#CCC'/>:<Icon name="ios-radio-button-on" size={32} color='green'/>}

            </View>
              {/*右边栏内容显示**/}
            <View style={styles.ItemContent}>
                <View style={styles.ItemHeadImage}>
                  {/**头像图标*/}
                    <Image
                    style={styles.face}
                    source={source}/>
                </View>
                <View style={{flex:1,}}>
                  <Text style={styles.ItemEmployeeName}>{Employee.name}({Employee.id})</Text>
                </View>
                <View style={{right:15,}}>
                  <Text style={styles.ItemEmployeePost}>[{Employee.positionname}]</Text>
                </View>
            </View>
            <Icon name="ios-arrow-forward-outline" size={24} color='#E3E3E3' />
        </View>
        </TouchableHighlight>);
    }

    render() {
      const Employee = this.props.employee;
      const isSelected = this.props.isSelected;
      const userInfo = this.props.userInfo;

        if(Employee.type === 1) {
          return this._department(Employee);
        }else{
          return this._employee(Employee,isSelected);
        }

    }

}

const styles = StyleSheet.create({
    face: {
        width: 38,
        height: 38,
        borderRadius:19,
    },
    Item: {
      //justifyContent: 'space-between',
      alignItems:'center',
      flexDirection:'row',
      backgroundColor: '#FFF',
      paddingRight:10,
    },
    ItemIcon:{
      paddingLeft:10,
      paddingRight:10,
    },
    ItemContent:{
      flex:1,
      height:52,
      //justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      borderBottomColor: '#ccc',
      borderBottomWidth: 0.5,
      //marginLeft:10,
      //marginRight:10,
    },
    ItemHeadImage: {
      marginRight:15,
    },
    ItemEmployeeName:{
      fontSize:17,
      color:'#000',
    },
    ItemEmployeePost: {
      fontSize:12,
      color:'#999',
    }
});

export default EmployeeItem;
