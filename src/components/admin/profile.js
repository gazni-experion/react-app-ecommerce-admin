import React, {useEffect} from 'react'
import { Card, Avatar, Tooltip } from 'antd';
import '../styles/styles.css'
import {  Link } from "react-router-dom";
import store from "../../store";
import { useNavigate } from "react-router-dom";
import { GetAdminDetails } from "../redux/actions/authAction";
import { UserOutlined, EditFilled } from '@ant-design/icons';
import ChangePassword from "./changePassword";




function Profile() {
    
    let navigate = useNavigate();
    GetAdminDetails();
    let profileDetails = store.getState().auth.auth.data;

    useEffect(() => {
        if (localStorage.getItem("token")) {
          console.log(profileDetails);
        } else {
          navigate("/");
        }
      }, [navigate,profileDetails]);
    
  return (
<div id='profile'>
<Card title='Profile' extra={<Link to="/admin/update-profile"><EditFilled /></Link>}>
      <Avatar size={64} icon={<UserOutlined />} />
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