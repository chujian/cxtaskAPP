import React,{ Component } from 'react'

import { connect } from 'react-redux'

import Task from '../Components/Task/Task_new'

class TaskConstanter extends Component {
  render(){
    return (
      <Task {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {user,task} = state;
  return {
    user,
    task,
  }
}

export default connect(mapStateToProps)(TaskConstanter)
