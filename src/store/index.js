import { combineReducers } from 'redux'
import { createStore } from 'redux'
import vtk from './vtk'

const rootState = combineReducers({
  vtk
})

const store = createStore(
  rootState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store