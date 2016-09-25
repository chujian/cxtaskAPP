import React,{Component} from 'react'
import {
	StyleSheet,
	View,
	Text,
	Dimensions,
	Platform,
	TouchableOpacity,
  Vibration,
} from 'react-native'

import Camera from 'react-native-camera'

const {height, width} = Dimensions.get('window');
const cameraSize = 250;
const borderColor = 'rgba(255,255,255,0.6)';
const borderBoxSize = 35;

class BarCode extends Component {
  constructor(props) {
		super(props);
		this.succesed = false;
	}
  _onBarCodeRead(e){
    if (this.succesed) return;

		this.succesed = true;
    Vibration.vibrate();
    console.log('条形码'+e.type + 'data=='+e.data);
    this.props.navigator.pop();
  }
  render() {
   return (
     <View style={styles.container}>
       <Camera
         ref={(cam) => {
           this.camera = cam;
         }}
         style={styles.preview}
         onBarCodeRead={(e) => this._onBarCodeRead(e)}
         aspect={Camera.constants.Aspect.fill}>
         <View style={styles.container}>
					<View style={styles.cameraView}>
						<View key="1" style={[styles.borderLeftTop,styles.borderBox]}/>
						<View key="2" style={[styles.borderRightTop,styles.borderBox]}/>
						<View key="3" style={[styles.borderLeftBottom,styles.borderBox]}/>
						<View key="4" style={[styles.borderRightBottom,styles.borderBox]}/>
					</View>
					<Text style={styles.infoText}>
						请将二维码放到框内
					</Text>
				</View>
       </Camera>
     </View>
   );
 }

 _takePicture() {
   this.camera.capture()
     .then((data) => console.log(data))
     .catch(err => console.error(err));
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  cameraWrapper: {
		width,
		height
	},
	camera: {
		width: width,
		height: height,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	cameraView: {
		height: cameraSize,
		width: cameraSize,
	},
	container: {
		height: 350
	},
	borderBox: {
		position: 'absolute',
		borderWidth: 2,
		height: borderBoxSize,
		width: borderBoxSize
	},
	borderLeftTop: {
		borderColor: 'transparent',
		borderLeftColor: borderColor,
		borderTopColor: borderColor,
		left: 0,
		top: 0
	},
	borderRightTop: {
		borderColor: 'transparent',
		borderRightColor: borderColor,
		borderTopColor: borderColor,
		right: 0,
		top: 0
	},
	borderLeftBottom: {
		borderColor: 'transparent',
		borderLeftColor: borderColor,
		borderBottomColor: borderColor,
		left: 0,
		bottom: 0
	},
	borderRightBottom: {
		borderColor: 'transparent',
		borderRightColor: borderColor,
		borderBottomColor: borderColor,
		right: 0,
		bottom: 0
	},
	infoText: {
		color: 'rgba(255,255,255,0.7)',
		textAlign: 'center',
		marginTop: 40,
		fontSize: 24
	},
	iconWrapper: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 45,
		width: 45
	},
	closeIcon: {
		flex: 1,
		textAlign: 'center'
	},
	buttonWrapper: {
		width: 35,
		height: 35,
		position: 'absolute',
		right: 30,
		top: 0
	}
});

export default BarCode;
