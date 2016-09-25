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
import BarcodeScanner from 'react-native-barcodescanner';
//import Camera from 'react-native-camera-android';
//import BarcodeScanner from 'react-native-barcode-scanner-universal'
//import BarcodeReaderView from 'react-native-barcode-reader';

const {height, width} = Dimensions.get('window');
const cameraSize = 250;
const borderColor = 'rgba(255,255,255,0.6)';
const borderBoxSize = 35;

class BarCode extends Component {
  constructor(props) {
    super(props);
		this.succesed = false;
    this.state = {
			barcode: '',
      cameraType: 'back',
      text: 'Scan Barcode',
      torchMode: 'off',
      type: '',
    };
  }

  _barcodeReceived(e) {
		if (this.succesed) return;

		this.succesed = true;
    //console.log('Barcode: ' + e.data);
    //console.log('Type: ' + e.type);
		alert('Barcode: ' + e.data);
		//this.props.navigator.pop();
  }

	barcodeReceived(e) {
	 //if (e.data !== this.state.barcode || e.type !== this.state.type) Vibration.vibrate();

	 this.setState({
		 barcode: e.data,
		 text: `${e.data} (${e.type})`,
		 type: e.type,
	 });
 }

  render() {
    return (
			<View style={styles.container}>
        <BarcodeScanner
          onBarCodeRead={(e) => this.barcodeReceived(e)}
          style={{ flex: 1 }}
          torchMode={this.state.torchMode}
          cameraType={this.state.cameraType}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.text}</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBarText: {
    fontSize: 20,
  },
});
export default BarCode;
