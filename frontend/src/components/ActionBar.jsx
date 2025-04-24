import React from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, CheckOutlined, FileTextOutlined, SaveOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ActionBar = ({ 
  title, 
  onAdd, 
  onEdit, 
  onDelete, 
  onAttendance, 
  onScoreEntry, 
  onSave, 
  showAdd = true,
  showEdit = true,
  showDelete = true,
  showAttendance = true, 
  showScoreEntry = true,
  showSave = true,  
  selectedCount = 0,
  linkText = '',      
  to = '#'
}) => {
  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <div className="d-flex align-items-center justify-content-center">
        {linkText && (
          <Link 
            to={to} 
            style={{
              color: '#7098c4',
              textDecoration: 'none',
              marginRight: '8px',
              fontWeight: 500,
              fontSize: "23px"
            }}
          >
            {linkText}
          </Link>
        )}

        <span style={{
          color: '#7098c4',
          textDecoration: 'none',
          marginRight: '8px',
          fontWeight: 500,
          fontSize: "23px"
        }}>/</span>

        <div style={{
          color: '#7098c4',
          textDecoration: 'none',
          fontWeight: 500,
          fontSize: "22px"
        }}>
          {title}
        </div>
      </div>
      
      <Space>
        {showAdd && (
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={onAdd}
          >
            Thêm mới
          </Button>
        )}
        
        {showEdit && (
          <Button 
            icon={<EditOutlined />} 
            onClick={onEdit}
            disabled={selectedCount !== 1}
          >
            Sửa
          </Button>
        )}
        
        {showDelete && (
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={onDelete}
            disabled={selectedCount === 0}
          >
            Xóa
          </Button>
        )}

        {showAttendance && (
          <Button 
            type="default" 
            icon={<CheckOutlined />} 
            onClick={onAttendance}
          >
            Điểm danh
          </Button>
        )}

        {showScoreEntry && (
          <Button 
            type="default" 
            icon={<FileTextOutlined />} 
            onClick={onScoreEntry}
          >
            Nhập điểm
          </Button>
        )}
        {showSave && (
          <Button 
            type="default" 
            icon={<SaveOutlined />} 
            onClick={onSave}
          >
            Lưu
          </Button>
        )}
      </Space>
    </div>
  );
};

export default ActionBar;