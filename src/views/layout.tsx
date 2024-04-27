import React, { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";

// 引入UI组件库
import { Breadcrumb, Layout, theme } from "antd";
const { Content } = Layout;
// 引入样式
import Styles from "@/assets/styles/home.module.scss";

const HomeView: React.FC = () => {
  return <Outlet></Outlet>;
};

export default HomeView;
