import {AUTH_SUCCESS, AUTH_FAIL} from './type'
import { useDispatch } from 'react-redux'
import { PostWithAuthTokenAsync } from '../../Components/Config/api'


export const  GetAdminDetails = ()  => {
  const dispatch = useDispatch();
    
  PostWithAuthTokenAsync('/auth/demo_validate.php')
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