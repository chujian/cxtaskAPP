'use strict'

import React,{Component} from 'react'
import {
  StyleSheet,
  View,
  Text,
  ListView,
  Platform,
  RefreshControl,
  InteractionManager,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import NavigationBar from 'react-native-navbar'
import EmployeeItem from './EmployeeItem'
import Loading from '../Common/loading';

import Icon from 'react-native-vector-icons/Ionicons'

import {fetchEmployee,applyEmployee,searchEmployee,clearEmployee} from '../../Actions/employeeActions'

const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class Employee extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      employeeSelected:{...this.props.employee.chooseEmployee},
      searchName: '',
      //department: this.props.user.userInfo.DEPARTNO,
      department: 'department',
    }
  }

  _onRefresh(){
    this.componentDidMount();
  }

  //点击选择人员,自动写入store
  _toggleEmployee(Employee) {
    const {dispatch} = this.props
    const employeeSelected = this.state.employeeSelected
    let value = !employeeSelected[Employee.id];
    if (value) {
      employeeSelected[Employee.id] = Employee.name;
    } else {
      delete employeeSelected[Employee.id];
    }
    this.setState({employeeSelected});
    dispatch(applyEmployee(this.state.employeeSelected));
  }

  _onChange() {
    const {dispatch,employee,user} = this.props
    //InteractionManager.runAfterInteractions(()=>{
      dispatch(fetchEmployee(this.state.department,user.token));
    //})
  }

  _selectDepartment(Employee){
    const {employee} = this.props
    let departId = Employee.id;

    if(!employee.List[departId]) {
      this.setState({department:Employee.id});

      InteractionManager.runAfterInteractions(()=>{
        this._onChange();
      })
    }

  }

  //确认选择人员,写入store,返回到任务界面
  _applySelected(){
    const {dispatch,navigator} = this.props
    //dispatch(applyEmployee(this.state.employeeSelected));
    console.log("routes==="+navigator.getCurrentRoutes()[2].name);
    navigator.popToRoute(navigator.getCurrentRoutes()[2]);
  }

  //搜索查询
  _searchEmployee(){
    const {dispatch} = this.props
    const {token} = this.props.user
    if(this.state.searchName.length < 2){
      alert("请至少输入2个中文字");
      return;
    }
    this.setState({department: 'search'});
    dispatch(searchEmployee(encodeURIComponent(this.state.searchName),token));
  }

  //关闭窗体
  _closeWin(){
    InteractionManager.runAfterInteractions(()=>{
      this.props.navigator.pop();
    });
  }

//清除已选择人员
  _clearSelected(){
    const {dispatch} = this.props
    Alert.alert(
          '提示',
          '您确定要清除已选择人员吗?',
          [
            {text: '点错了', onPress: () => console.log('取消关闭!')},
            {text: '确认', onPress: () => {
              //清除选择的人
              this.setState({employeeSelected: {} });
              dispatch(clearEmployee());
            }},
          ]
        )
  }

  componentWillMount() {
    const {dispatch,employee,user} = this.props
    console.log('ddd=='+this.props.department);
    if(this.props.department !== null && this.props.department !== undefined) {
      this.setState({department: this.props.department});
    }
  }

  componentDidMount(){
    const {employee} = this.props
    let departId = this.state.department;

    //这里防止再次去网络fetch信息,因为store里面有就不需要网络上获取了
    InteractionManager.runAfterInteractions(()=>{
      if(employee.List[departId].employeeList.length === 0) {
        this._onChange();
      }
    })
  }

  render() {
    const {employee}  = this.props
    const {userInfo} = this.props.user

    if(!employee.List[this.state.department]) {
      employee.List[this.state.department] = {
        employeeList: [],
      }
    }

    //已选择人数量
    let selectedCount = 0;
    for(var i in employee.chooseEmployee) {selectedCount++}

    let source = dataSource.cloneWithRows(employee.List[this.state.department].employeeList);

    const rightButtonConfig = {
      title: '确认',
      tintColor:'#FFF',
      handler: () => this._applySelected(),
    };
    console.log("emp==="+employee.isFetching);
    return(
      <View style={styles.container}>
      <NavigationBar
        style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
        statusBar={{style:'light-content',showAnimation:'slide'}}
        tintColor={'#3F465A'}
        title={{title: '常笑员工选择',tintColor:'#FFF'}}
        rightButton={rightButtonConfig}
        leftButton={<TouchableOpacity
                    onPress={()=>this._closeWin()}
                    underlayColor="#eee">
                    <View style={{alignItems:'center',justifyContent: 'flex-end',marginLeft:20,flexDirection:'row',top:5}}>
                    <Icon name="ios-arrow-back" size={32} color='#FFF' />
                    <Text style={{color:'#FFF',fontSize:16,marginLeft:8}}>返回</Text>
                    </View>
                  </TouchableOpacity>}
        />
        <View style={styles.searchBar}>
          <TextInput
          placeholder='请输入姓名查询'
          returnKeyType='search'
          style={{height:40,}}
          onChangeText={(text) => this.setState({ searchName: text }) }
          onSubmitEditing={()=>this._searchEmployee()}
          />
        </View>
        <View style={styles.selectedBar}>
          <Text>已选择({selectedCount})</Text>
          <Text onPress={()=>this._clearSelected()}>清除</Text>
        </View>

        <ListView
              enableEmptySections={true}
              automaticallyAdjustContentInsets={false}
              removeClippedSubviews={true}
              ref='EmployeeLists'
              dataSource={source}
              initialListSize={10}
              pageSize={3}
              //renderHeader={()=>this._renderHeader()}
              renderRow={(Employee) => {
                return (
                  <EmployeeItem
                  employee={Employee}
                  userInfo={userInfo}
                  isSelected={!this.state.employeeSelected[Employee.id]}
                  onToggle={()=>this._toggleEmployee(Employee)}
                  onChange={()=>this._onChange()}
                  selectDepartment={()=>this._selectDepartment(Employee)}
                  navigator={this.props.navigator}
                  />
                );
              }}
              refreshControl={
                        <RefreshControl
                            refreshing={employee.isFetching}
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
      backgroundColor: '#efeff4',
  },
  emptyMessage:{
    width:300,
    height:300,
    justifyContent:'center',
    alignItems:'center',
  },
  selectedBar:{
    alignItems:'center',
    justifyContent:'space-between',
    flexDirection:'row',
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'#FFF',
    height:42,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
  }
});
export default Employee;
