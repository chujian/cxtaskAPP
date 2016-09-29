import React,{Component} from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Text,
    View,
    Dimensions,
    Modal,
    Platform,
} from 'react-native';

var {height, width} = Dimensions.get('window');
//console.log('高'+height+'宽'+width);
class Loading extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          loadingTitle: this.props.loadingTitle === undefined ? '正在加载中...' :this.props.loadingTitle,
          isLoading: this.props.isLoading === undefined ? false : this.props.isLoading,
          animationType: 'none',
          modalVisible: false,
          transparent: false,
        };
    }

    componentWillReceiveProps(nextProps) {
      this.setState({isLoading:nextProps.isLoading});
    }

    _Spinner(){
      if (Platform.OS === 'android') {
        return(<ActivityIndicator
          styleAttr="Small"
          color="#FFF"/>);
      }else{
        return(<ActivityIndicator
        color="#FFF"
        size="large"
        animating={true}/>);
      }
    }

    _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
    render(){
      //console.log('title==='+this.props.isLoading);
        return(
          <Modal
        animationType={'none'}
        transparent={true}
        visible={this.state.isLoading}
        onRequestClose={() => {this._setModalVisible(false)}}
        >
          <View style={styles.container}>
            {this._Spinner()}
            <Text style={styles.loadingTitle}>{this.state.loadingTitle}</Text>
            </View>
          </Modal>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: height/2-40,
        left: width/2-50,
    },
    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
});

export default Loading;
