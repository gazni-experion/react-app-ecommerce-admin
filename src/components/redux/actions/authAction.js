import {AUTH_SUCCESS, AUTH_FAIL} from './type'
import axios from 'axios'
import { useDispatch } from 'react-redux'


export const  GetAdminDetails = ()  => {
  const dispatch = useDispatch();
    

        axios.get()
        .then((res)=>{
            dispatch( {
                type: AUTH_SUCCESS,
                payload: res.data
            })
        })
        .catch((e)=>{
                dispatch( {
                    type: AUTH_FAIL,
                    payload: console.log(e),
                })
        })
}