import axios from 'axios';
import serverData from './constant'
import setAuthToken from './config'

const baseUrl =  serverData.BASEURL;
const config = {
    headers:{
        'Content-Type':'application/json'
    }
}
export const PostWithAuthToken = (url, data) => {
    if(localStorage.getItem('token')){
        setAuthToken(localStorage.getItem('token'));
    } 
    try {
        const res = axios.post(baseUrl + url, data,config);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const PostWithAuthTokenAsync = async (url, data) => {
    if(localStorage.getItem('token')){
        setAuthToken(localStorage.getItem('token'));
    } 
    try {
        const res = await axios.post(baseUrl + url, data,config);
        return res;
    } catch (error) {
        console.log(error);
    }
}




