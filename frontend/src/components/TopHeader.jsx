import React from 'react';
import { Input, Space, Tooltip, Badge, Avatar } from 'antd';
import {
  SearchOutlined,
  BellOutlined,
  SettingOutlined,
  UserOutlined,
  BulbOutlined,
} from '@ant-design/icons';

const TopHeader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        width: '100%', 
        boxSizing: 'border-box', 
        height:"60px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
      }}
    >
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{ width: 400 }}
      />

      <Space size="middle">
      
        <Tooltip title="Settings">
          <SettingOutlined style={{ fontSize: 18 }} />
        </Tooltip>

        <Tooltip title="User">
          <Avatar icon={<UserOutlined />} size="small" />
        </Tooltip>
      </Space>
    </div>
  );
};

export default TopHeader;