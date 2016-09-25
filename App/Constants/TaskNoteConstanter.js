import React,{ Component } from 'react';

import { connect } from 'react-redux';

import TaskNote from '../Components/TaskNote';

class TaskNoteConstanter extends React.Component {
  render() {
    return (
      <TaskNote {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {task} = state;
  return {
    newTask: task.taskNew,
  }
}

export default connect(mapStateToProps)(TaskNoteConstanter)
