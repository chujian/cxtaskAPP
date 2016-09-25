import React,{ Component } from 'react';

import { connect } from 'react-redux';

import Employee from '../Components/Employee/Employee';

class EmployeeConstanter extends React.Component {
  render() {
    return (
      <Employee {...this.props} />
    );
  }
}

let mapStateToProps = (state) => {
  const {user,employee} = state;
  return {
    user,
    employee,
  }
}

export default connect(mapStateToProps)(EmployeeConstanter)
