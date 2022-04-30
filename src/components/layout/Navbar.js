import { Outlet, Link } from "react-router-dom";
import React, { useState } from "react";
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
  LogoutOutlined,
} from "@ant-design/icons";



const { Header, Sider, Content, Footer} = Layout;

function Navbar() {
  const [state, setState] = useState(false);

  const toggle = () => setState(!state);

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
      label: <Link to="*">ABOUT US</Link>,
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
         <span className="header">Welcome Admin</span>
         <Tooltip placement="bottom" title="logout">
         <LogoutOutlined />
         </Tooltip>
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

export default () => <Navbar />;