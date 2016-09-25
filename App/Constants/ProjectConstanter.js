import React,{ Component } from 'react'

import { connect } from 'react-redux'

import Project from '../Components/Project'

class ProjectConstanter extends Component {
  render(){
    return (
      <Project {...this.props} />
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

export default connect(mapStateToProps)(ProjectConstanter)
