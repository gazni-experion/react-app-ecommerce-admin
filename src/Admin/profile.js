import React, {useEffect, useState} from 'react'
import { Card, Avatar } from 'antd';
import '../Styles/styles.css'
import {  Link } from "react-router-dom";
import store from "../Store/store";
import { useNavigate } from "react-router-dom";
import { GetAdminDetails } from "../Store/Actions/authAction";
import { EditFilled } from '@ant-design/icons';
import ChangePassword from "./changePassword";
import {GetAsync} from '../Components/Config/api'

function Profile() {
  const[pic,setPic] = useState('');
    let navigate = useNavigate();
    GetAdminDetails();
    let profileDetails = store.getState().auth.auth.data;
    useEffect(() => {
        if (localStorage.getItem("token")) {
          console.log(profileDetails);
          GetAsync("/userImages/read_one.php?id="+profileDetails.userId)
          .then(res => {
            console.log(res.data.image);
          setPic(res.data.image);
          })
          .catch(err => {console.log(err);});
        } else {
          navigate("/");
        }
      }, [navigate,profileDetails]);
    
  return (
<div id='profile'>
<Card title='Profile' extra={<Link to="/admin/update-profile"><EditFilled /></Link>}>
      {/* <Avatar size={100} src={require("../Assets/"+pic)}/> */}
      {pic && <Avatar size={100} src={require("../Assets/"+pic)}/>}
      <div className="details">
        <span><h3>User Id:{profileDetails.userId}</h3><h3>User Name: {profileDetails.userName}</h3>
        <h3>Email :{profileDetails.email}</h3><h3>Phone Number: {profileDetails.phoneNumber}</h3> <h3>Gender: {profileDetails.gender}</h3></span>
      </div>
    <ChangePassword />
    </Card>
</div>
  )
}

export default Profile