import {AUTH_SUCCESS, AUTH_FAIL} from '../actions/type'

const initialState = {
    auth:[],
    status:'PLEASE LOGIN!'
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case 'AUTH_SUCCESS':
        return{ 
        ...state,
        auth:action.payload,
        status:AUTH_SUCCESS}
      case 'AUTH_FAIL':
        return {
            ...state,
            auth:action.payload,
            status:AUTH_FAIL}
      default:
        return state
    }
  }