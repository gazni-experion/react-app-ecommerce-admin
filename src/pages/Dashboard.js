import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../components/styles.css";
import { Layout, Menu } from "antd";

import Header from "../components/layout/Header";
import Sider from "../components/layout/Sider";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";

import Products from "../components/Products.js";
import Users from "../components/Users.js";
import Login from "../components/auth/Login.js";

const { Content } = Layout;

function Dashboard() {
  const [state, setState] = useState(false);

  const toggle = () => setState(!state);
  const routes = [{ path: "/", component: <Products />, key: "/" }];


  return (

    <Layout hasSider>
      <Sider />
      <Layout className="site-layout">
        <Header />
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >

            <Routes>
             
                <Route  path='view/products' element={<Products/>} />;
                <Route  path='/dashboard/users' element={<Users/>} />;
       
            </Routes>
        </Content>
      </Layout>
    </Layout>

  );
}

export default () => <Dashboard />;
