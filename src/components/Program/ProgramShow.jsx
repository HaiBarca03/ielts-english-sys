import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table, Spin, Alert } from "antd";
import "react-toastify/dist/ReactToastify.css";

const ProgramShow = ({ 
  items, 
  loading, 
  onSelectItems, 
  onRowClick,
  pagination,
  onPageChange 
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  const columns = [
    {
      title: <span className="table-title pe-3" style={{ color: "#fff", fontWeight: "bold" }}>Tên khóa học</span>,
      dataIndex: "brand_name",
      key: "brand_name",
      sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      render: (text, record) => (
        <Link to={`/programs/${encodeURIComponent(record.program_id)}`} className="text-decoration-none">
          {text}
        </Link>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (text, record) => (
        <Link to={`/programs/${encodeURIComponent(record.program_id)}`} className="text-decoration-none text-muted">
          {text}
        </Link>
      ),
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
    <div>
        <Table
          style={{ width: '100%' }}
          className="header-custom-bg"
          columns={columns}
          rowSelection={rowSelection}
          dataSource={items}
          loading={loading}
          onRow={(record) => ({
            onClick: () => onRowClick(record),
          })}
          rowKey="program_id"
          pagination={{
            ...pagination,
            onChange: onPageChange,
          }}
        />
    </div>
  );
}

export default ProgramShow;