import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import style from "./components/styles/style.module.css";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header
      style={{
        position: "fixed",
        top: "0px",
        zIndex: 1,
        width: "100%",
        height: "6rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <div>
        <img
          style={{ height: "4rem", marginTop: "1.5rem" }}
          src="https://www.bestera.com.tr/img/logo.png"
          alt="Logo"
        />
      </div>
      <div>
        <Menu
          style={{ width: window.innerWidth < 600 ? "10rem" : "20rem" }}
          mode="horizontal"
          defaultSelectedKeys={["home"]}
        >
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="about" icon={<InfoCircleOutlined />}>
            About
          </Menu.Item>
          <Menu.Item key="contact" icon={<ContactsOutlined />}>
            Contact
          </Menu.Item>
        </Menu>
      </div>
    </Header>
  );
};

export default AppHeader;
