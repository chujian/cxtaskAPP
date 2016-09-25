
import {combineReducers} from 'redux'

import user from './userReducer'
import task from './taskReducer'
import project from './projectReducer'
import activity from './activityReducer'
import employee from './employeeReducer'
import comment from './commentReducer'

const rootReducer = combineReducers({
  user,
  task,
  project,
  activity,
  employee,
  comment,
});

export default rootReducer;
