import React,{ Component } from 'react'

import { connect } from 'react-redux'

import TaskIndex from '../Components/Task/TaskIndex'

class TaskIndexConstanter extends Component {
  render(){
    return (
      <TaskIndex {...this.props} />
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

export default connect(mapStateToProps)(TaskIndexConstanter)
