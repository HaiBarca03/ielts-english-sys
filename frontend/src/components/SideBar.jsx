import React, { useState } from "react";
import {
  HomeOutlined,
  CalendarOutlined,
  LogoutOutlined,
  BookOutlined,
  TeamOutlined,
  DollarOutlined,
  SolutionOutlined,
  UsergroupAddOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { Text } = Typography;

const menuConfig = {
  Admin: [
    { key: "dashboard", label: "Trang chủ", icon: <HomeOutlined />, path: "/dashboard" },
    { key: "schedule", label: "Thời khóa biểu", icon: <CalendarOutlined />, path: "/schedule" },
    {
      key: "student",
      label: "Học viên",
      icon: <LogoutOutlined />,
      path: "/students"
    },
    {
      key: "program",
      label: "Khóa học",
      icon: <BookOutlined />,
      path: "/programs"
    },
    {
      key: "class",
      label: "Lớp học",
      icon: <TeamOutlined />,
      path: "/classes"
    },
    { key: "attendance", label: "Điểm danh theo lớp", icon: <SolutionOutlined />, path: "/attendance" },
    { key: "payment", label: "Thu học phí", icon: <DollarOutlined />, path: "/payment" },
    {
      key: "teacher",
      label: "Giáo viên",
      icon: <UsergroupAddOutlined />,
      path: "/teachers"
    },
    // Thêm mục Logout
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      path: "/login"
    },
  ],

  Student: [
    { key: "dashboard", label: "Trang chủ", icon: <HomeOutlined />, path: "/dashboard/student" },
    { key: "attendance", label: "Điểm danh", icon: <SolutionOutlined />, path: "/attendance/student" },
    { key: "score", label: "Bảng điểm", icon: <SolutionOutlined />, path: "/score/student" },
    {
      key: "classes",
      label: "Lớp học",
      icon: <BookOutlined />,
      path: "/classes/student"
    },
    // Thêm mục Logout
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      path: "/login"
    },
  ],

  Teacher: [
    { key: "dashboard", label: "Trang chủ", icon: <HomeOutlined />, path: "/dashboard/teacher" },
    { key: "classList", label: "Danh sách lớp", icon: <TeamOutlined />, path: "/classes/teacher" },
    { key: "attendance", label: "Điểm danh",icon: <SolutionOutlined />, path: "/teacher/attendance" },
    { key: "score", label: "Nhập điểm", icon: <SolutionOutlined />, path: "/teacher/score-entry" },
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      path: "/login"
    },
  ]
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "Admin";
  const menuItems = menuConfig[role] || [];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const renderMenuItems = (items) =>
    items.map((item) =>
      item.key === "logout" ? (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={handleLogout} 
        >
          {item.label}
        </Menu.Item>
      ) : (
        <Menu.Item key={item.key} icon={item.icon} onClick={() => navigate(item.path)}>
          {item.label}
        </Menu.Item>
      )
    );

  return (
    <Sider
      width={240}
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{ background: "#f2f0f1", height: "100vh", borderRight: "1px solid #f0f0f0" }}
    >
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div className="d-flex justify-content-between align-items-center px-3">
          {!collapsed && <h5 className="text-primary mb-0">EnglishCenter</h5>}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>
        <div style={{ marginTop: 12 }}>
          <Avatar size={64} src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
          {!collapsed && (
            <div style={{ marginTop: 8 }}>
            <Text style={{ color: "#000" }}>{role.toUpperCase()}</Text>
            <br></br>
            <Text style={{ color: "#000", fontWeight: "bold" }}>{user?.name}</Text>
            <br></br>
            <Text style={{ color: "#666", fontSize: "12px" }}>{user?.email }</Text>
            </div>
          )}
        </div>
      </div>

      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        style={{
          borderRight: 0,
          background: '#f2f0f1' 
        }}
      >
        {renderMenuItems(menuItems)}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
