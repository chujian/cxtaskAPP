import React,{ Component } from 'react';

import { connect } from 'react-redux';

import ProjectAdd from '../Components/Project/ProjectAdd';

class ProjectAddConstanter extends React.Component {
  render() {
    return (
      <ProjectAdd {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {user,project} = state;
  return {
    user,
    project,
  }
}

export default connect(mapStateToProps)(ProjectAddConstanter)
