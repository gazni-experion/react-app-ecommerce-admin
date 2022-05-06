import "../styles/styles.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LuggageIcon from "@mui/icons-material/Luggage";
import GrainIcon from "@mui/icons-material/Grain";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../config/config.js';
import {PostWithAuthToken} from '../config/api';
import store from "../../store";
import { GetAdminDetails } from "../redux/actions/authAction";

const cust = "4";
const orders = "13";
let users = "7";
function Home() {
  useEffect(() => {
    console.log(store.getState());
    if(localStorage.getItem('token')){
      GetAdminDetails();
      PostWithAuthToken('/auth/demo_validate.php')
      .then((res)=>{
        console.log(res);
      } );
    }
  }, []);

  return (
    <div className="container">
      <span className="cards">
        <Card>
          <CardContent>
            <Typography variant="button" display="block" gutterBottom>
              <GroupAddIcon /> {cust} Global Customers
            </Typography>
            <Typography color="text.secondary">
              Your numbers are growing
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="button" display="block" gutterBottom>
              <LuggageIcon /> {orders} Orders
            </Typography>
            <Typography color="text.secondary">Numbers are growing</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="button" display="block" gutterBottom>
              <GrainIcon /> {users} Users
            </Typography>
            <Typography color="text.secondary">
              Our family is getting bigger
            </Typography>
          </CardContent>
        </Card>
      </span>
    </div>
  );
}
export default Home;
