import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Layout, Menu } from "antd";
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
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function Navbar() {
  const [state, setState] = useState(false);

  const toggle = () => setState(!state);

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
        }}
        trigger={null}
        collapsible
        collapsed={state}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "DASHBOARD",
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: "MANAGE",
            },
            {
              key: "3",
              icon: <OrderedListOutlined />,
              label: "ORDERS",
            },
            {
              key: "4",
              icon: <PieChartOutlined />,
              label: "CATEGORIES",
            },
            {
              key: "5",
              icon: <GroupOutlined />,
              label: "PRODUCTS",
            },
            {
              key: "6",
              icon: <PlaySquareOutlined />,
              label: "BANNERS",
            },
            {
              key: "7",
              icon: <SmileOutlined />,
              label: "REVIEWS",
            },
            {
              key: "8",
              icon: <UnorderedListOutlined />,
              label: "ENQUIRIES",
            },
            {
              key: "9",
              icon: <BookOutlined />,
              label: "ABOUT US",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 5, fontSize:25}}>
          {state ? (
            <MenuUnfoldOutlined onClick={toggle} />
          ) : (
            <MenuFoldOutlined onClick={toggle} />
          )}
         <span style={{margin:30}}>Welcome Admin</span>
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
