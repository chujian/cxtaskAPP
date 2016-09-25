'use strict';

import React,{Component} from 'react';
import { Provider } from 'react-redux';

import configureStore from './Store/index';
import App from './Constants/app';

const store = configureStore();

class cxtask extends React.Component{
  render(){
    return(
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
export default cxtask;
