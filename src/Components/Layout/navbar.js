import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../styles/styles.css";
import { Layout, Menu, Tooltip } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DashboardOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  GroupOutlined,
  SmileOutlined,
  UnorderedListOutlined,
  BookOutlined,
  PlaySquareOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import store from "../../store";
import { GetAdminDetails } from "../Redux/Actions/authAction";


const { Header, Sider, Content} = Layout;

const user = localStorage.getItem('userName');

function Navbar() {

  GetAdminDetails();

let loginStatus = store.getState().auth.isLoggedIn;

  let navigate = useNavigate();
  const [state, setState] = useState(false);

  useEffect(() => {
    console.log(loginStatus);
  }, [loginStatus]);
  const toggle = () => setState(!state);
  const logout = () => {
      // Navigate to Login page
      navigate("/");
      localStorage.clear();
  };

  let items =[
    {
      
      key: "1",
      icon: <DashboardOutlined />,
      label: <Link to="dashboard">DASHBOARD</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link to="users">MANAGE</Link>,
    },
    {
      key: "3",
      icon: <OrderedListOutlined />,
      label: <Link to="orders">ORDERS</Link>,

    },
    {
      key: "4",
      icon: <PieChartOutlined />,
      label: <Link to="categories">CATEGORIES</Link>,
    },
    {
      key: "5",
      icon: <GroupOutlined />,
      label: <Link to="products">PRODUCTS</Link>,
    },
    {
      key: "6",
      icon: <PlaySquareOutlined />,
      label: <Link to="*">BANNERS</Link>,
    },
    {
      key: "7",
      icon: <SmileOutlined />,
      label: <Link to="*">REVIEWS</Link>,
    },
    {
      key: "8",
      icon: <UnorderedListOutlined />,
      label: <Link to="*">ENQUIRIES</Link>,
    },
    {
      key: "9",
      icon: <BookOutlined />,
      label: <Link to="about-us">ABOUT US</Link>,
    },
  ] ;

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100%",
          backgroundColor: "#fff",
          color: "black"
        }}
        trigger={null}
        collapsible
        collapsed={state}
        
      >
        <div className="logo" >Logo</div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items ={items}
          style={{ height: "500%",  color: "#833768" }}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 5, fontSize:25,  backgroundColor:"#ffe8ff18"}}>
          {state ? (
            <MenuUnfoldOutlined onClick={toggle} />
          ) : (
            <MenuFoldOutlined onClick={toggle} />
          )}
         <span className="header">
         {loginStatus ? ( 
        <Link to="profile">Welcome back - {user}</Link>
 ) : (<Link to="/">Please Login</Link>)
         }
          </span>
          {loginStatus?(
          <Tooltip placement="bottom" title="logout" onClick={logout}>
         <LogoutOutlined />
         </Tooltip>): null }
         
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
    
      </Layout>
    </Layout>
  );
}

export default Navbar;
