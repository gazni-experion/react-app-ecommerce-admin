import {AUTH_SUCCESS, AUTH_FAIL} from './type'
import { useDispatch } from 'react-redux'
import { PostWithAuthToken } from '../../Config/api'


export const  GetAdminDetails = ()  => {
  const dispatch = useDispatch();
    
  PostWithAuthToken('/auth/demo_validate.php')
      .then((res)=>{
        dispatch( {
            type: AUTH_SUCCESS,
            payload: res.data
        })
      } )
      .catch((e)=>{
        dispatch( {
            type: AUTH_FAIL,
            payload: console.log(e),
        })
})

}