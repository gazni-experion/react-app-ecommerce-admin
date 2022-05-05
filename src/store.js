import { createStore } from 'redux'
import reducer from './components/redux/reducers'

const initialState = {};
const store = createStore(reducer,initialState);

export default store;