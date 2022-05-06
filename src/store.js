import { configureStore } from '@reduxjs/toolkit';
import reducer from './components/redux/reducers'


const initialState = {};
const store = configureStore({reducer:reducer},initialState);

console.log(store.getState());
export default store;