import React, { useState, useEffect } from "react";

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
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function Side() {
  const [state, setState] = useState(false);
  return (
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
        //   items={[
        //     {
        //       key: "1",
        //       icon: <DashboardOutlined />,
        //       label: "DASHBOARD",

        //     },
        //     {
        //       key: "2",
        //       icon: <UserOutlined />,
        //       label: "MANAGE",
        //     },
        //     {
        //       key: "3",
        //       icon: <OrderedListOutlined />,
        //       label: "ORDERS",
        //     },
        //     {
        //       key: "4",
        //       icon: <PieChartOutlined />,
        //       label: "CATEGORIES",
        //     },
        //     {
        //       key: "5",
        //       icon: <GroupOutlined />,
        //       label: "PRODUCTS",
        //     },
        //     {
        //       key: "6",
        //       icon: <PlaySquareOutlined />,
        //       label: "BANNERS",
        //     },
        //     {
        //       key: "7",
        //       icon: <SmileOutlined />,
        //       label: "REVIEWS",
        //     },
        //     {
        //       key: "8",
        //       icon: <UnorderedListOutlined />,
        //       label: "ENQUIRIES",
        //     },
        //     {
        //       key: "9",
        //       icon: <BookOutlined />,
        //       label: "ABOUT US",
        //     },
        //   ]}
      >
        <Menu.Item>
          <Link to='view/products'>item 1</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/dashboard/users'>Users</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Side;
