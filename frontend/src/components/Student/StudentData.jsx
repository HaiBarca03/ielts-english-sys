import React, { useState } from 'react';
import { Table } from 'antd';
import moment from 'moment';

const StudentData = ({ 
  items, 
  loading,
  pagination,
  onSelectItems,
  onRowClick ,
  onPageChange
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const columns = [
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'dob',
      key: 'dob',
      render: (dob) => (dob ? moment(dob).format('DD/MM/YYYY') : ''),
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Trường học',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (createdAt) => (createdAt ? moment(createdAt).format('HH:mm DD/MM/YYYY') : ''),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, selectedRows) => {
      setSelectedRowKeys(keys);
      onSelectItems(selectedRows);
    },
  };

  return (
    <Table
      className="header-custom-bg"
      columns={columns}
      rowSelection={rowSelection}
      dataSource={items}
      loading={loading}
      rowKey="user_id"
      pagination={pagination}
      onChange={(pagination) => {
        onPageChange(pagination.current); // Only handle pagination
      }}
      onRow={(record) => ({
        onClick: () => onRowClick(record),
      })}
    />
  );
};

export default StudentData;