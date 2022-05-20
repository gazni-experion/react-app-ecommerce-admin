import "../Styles/styles.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LuggageIcon from "@mui/icons-material/Luggage";
import GrainIcon from "@mui/icons-material/Grain";
import React, { useEffect, useState } from "react";
import store from "../Store/store";
import { GetAdminDetails } from "../Store/Actions/authAction";
import { GetAsync } from "../Components/Config/api";

function Home() {
  const [users, setUsers] = useState("");
  const [cust, setCust] = useState("");
  const [orders, setOrders] = useState("");
  GetAdminDetails();
  useEffect(() => {
    GetAsync("/users/nos.php") //users
      .then((res) => {
        setUsers(res.data.users);
      })

      .catch(function (error) {
        console.log(error);
      });
    GetAsync("/customers/nos.php") //Customers
      .then((res) => {
        setCust(res.data.customers);
      })

      .catch(function (error) {
        console.log(error);
      });
    GetAsync("/orders/nos.php") //Orders
      .then((res) => {
        setOrders(res.data.orders);
      })

      .catch(function (error) {
        console.log(error);
      });
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
