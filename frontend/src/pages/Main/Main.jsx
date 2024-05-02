import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
  QuestionOutlined,
  AudioOutlined,
  DownOutlined,
  LogoutOutlined,
  UploadOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Dropdown, Space } from "antd";
import logo from '../../assets/logo-color.png'

const { Header, Sider, Content } = Layout;

const Main = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const profileImg = localStorage.getItem("profile_url");
  const username = localStorage.getItem("user");
  const navigate = useNavigate();
  const location = useLocation();

  // Define a mapping from pathname to menu key
  const pathToKeyMap = {
    '/chat': '1',
    '/upload': '2',
    '/sentiment-analysis': '3', // Assuming this is your path for sentiment analysis
    '/rag-upload': '4',
  };

  // Get the current pathname and map it to the corresponding menu key
  const currentKey = pathToKeyMap[location.pathname] || '1'; // Default to '1' if the path doesn't match

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const items = [
    {
      key: "1",
      label: (
        <Space onClick={handleLogout} className="w-full">
          <LogoutOutlined />
          <button>Logout</button>
        </Space>
      ),
    },
  ];
  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex justify-center items-center w-full h-[8%] mb-5" >
            <img src={logo} alt="logo" className="" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[currentKey]}
          items={[
            {
              key: "1",
              icon: <QuestionOutlined />,
              label: "Question/Answer",
              onClick: () => navigate('/chat')
            },
            {
              key: "2",
              icon: <AudioOutlined />,
              label: "Audio Transcription",
              onClick: () => navigate('/upload')
            },
            {
              key: "3",
              icon: <SmileOutlined />,
              label: "Sentiment Analysis",
            },
            {
              key: "4",
              icon: <UploadOutlined />,
              label: "RAG Collection",
              onClick: () => navigate('/rag-upload')
            },
          ]}
        />
      </Sider>
      <Layout className="bg-slate-400">
        <Header
          style={{
            padding: 0,
            background: "#213547",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              color: "white"
            }}
          />
          <Dropdown
            menu={{
              items,
            }}
            className="cursor-pointer pr-4"
          >
            <Space className="text-white">
              <img src={profileImg} alt="profileImg" width={30} className="rounded-full"/>
              {username}
              <DownOutlined />
            </Space>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#213547",
            borderRadius: borderRadiusLG,
            color: "white"
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Main;
