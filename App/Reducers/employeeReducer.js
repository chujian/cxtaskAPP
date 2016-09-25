import * as TYPES from '../Constants/ActionTypes';

const initialState = {
  isFetching: false,
  List:{},
  chooseEmployee:{},
};

let employeeReducer = (state=initialState,action) => {
  switch (action.type) {
    case TYPES.EMPLOYEE_LIST_REQUEST:
    return {
      ...state,
      isFetching: true,
    }
    case TYPES.EMPLOYEE_LIST_RECEIVE:
    return {
      ...state,
      isFetching: action.isFetching,
      List: getNewCache(state,action.employeeList,action.departId)
    }
    case TYPES.SELECTED_EMPLOYEES:
    return {
      ...state,
      chooseEmployee: action.employees,
    }
    case TYPES.CLEAR_SELECTED_EMPLOYEES:
    return {
      ...state,
      chooseEmployee: {},
    }
    default:
    return state;
  }
}

function getNewCache(oldState, employeeList, departId) {
  let newEmployeeList = [];
  let newState = { ...oldState };

  newEmployeeList = employeeList.slice(0);

  newState.List[departId] = {
    employeeList: newEmployeeList
  };
  return newState.List;
}

export default employeeReducer;
