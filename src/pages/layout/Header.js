
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";

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

function Head() {
    const [state, setState] = useState(false);
    const toggle = () => setState(!state);
  return (
    <Header className="site-layout-background" style={{ padding: 5, fontSize:25}}>
    {state ? (
      <MenuUnfoldOutlined onClick={toggle} />
    ) : (
      <MenuFoldOutlined onClick={toggle} />
    )}
   <span style={{margin:30}}>Welcome Admin</span>
  </Header>
  )
}

export default Head