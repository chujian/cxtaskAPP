import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Switch,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Alert,
} from 'react-native';

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'

const {height, width} = Dimensions.get('window');

export default class User extends React.Component {
    render() {
        return (
            <View style={styles.container}>
            <NavigationBar
              tintColor={'#3F465A'}
              statusBar={{style:'light-content',showAnimation:'slide'}}
              title={{title: '我的',tintColor:'#FFF'}}
              />
              <ScrollView contentContainerStyle={styles.ScrollView} automaticallyAdjustContentInsets={false}>
                <HeadView />
                <JurisdictionView />
                <View style={styles.switchCell}>
                    <View style={{}}>
                        <Text>接收通知</Text>
                    </View>
                    <Switch
                        style={styles.switch}
                    />
                </View>

              </ScrollView>
            </View>
        )
    }
}

class HeadView extends React.Component {
    render() {
        return (
            <View>
                <Image style={styles.myBgImage} source={require('../../Images/img_my_bg.png') }>
                    <Image style={styles.headIcon} source={require('../../Images/img_default_head.png')}/>
                    <TouchableOpacity style={styles.login}>
                        <Text style={{color: 'white'}}>点击登录</Text>
                    </TouchableOpacity>
                </Image>
            </View>
        );
    }
}

class JurisdictionView extends React.Component {
    render() {
        let icons = ['ios-calendar-outline', 'ios-clipboard-outline', 'ios-folder-open-outline','ios-paper-outline'];
        let titles = ['任务数量', '项目数量', '我的收藏','归档任务'];
        return (
            <View style={styles.jurisdictionView}>
                {
                    icons.map((icon, i) => {
                        return (
                            <TouchableOpacity
                                key={i}
                                style={styles.handleView}
                                onPress={()=> Alert.alert('啊哦')}
                            >
                                <Icon name={icon} size={30} color="#3F465A"/>
                                <Text style={{marginTop: 10}}>{titles[i]}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ScrollView: {
      padding:0,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5
    },

    myBgImage: {
        flex: 1,
        height: 160,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'cover',
    },

    headIcon: {
        height: 80,
        width: 80,
    },

    login: {
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 0.5,
        padding: 5,
        marginTop: 10,
    },

    jurisdictionView: {
        flexDirection: 'row',
        height: 100,
        borderBottomColor: 'rgb(241, 241, 241)',
        borderBottomWidth: 10
    },

    handleView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    switchCell: {
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
        borderBottomColor: 'rgb(241, 241, 241)',
        borderBottomWidth: 10,
        height:50,
    },

    switch: {
        position: 'absolute',
        right: 15,
    },

    cell: {
        flexDirection: 'row',
        height: 40,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'space-between',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center'
    },

    rightIcon: {
        position: 'absolute',
        right: -10,
        top: 5,
        height: 30,
        width: 30
    },
    container: {
        flex: 1,
        //backgroundColor: '#999',
    }

})
