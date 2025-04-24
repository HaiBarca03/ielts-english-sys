import React from 'react';
import { Row, Col, Table } from 'antd';
import { Link } from 'react-router-dom';

const DashboardTables = ({ recentClasses, recentPrograms }) => {
  // Columns cho bảng lớp học
  const classColumns = [
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Link to={`/classes/${record.class_id}`}>{text}</Link>
      ),
    },
    { 
      title: 'Trạng thái', 
      dataIndex: 'status', 
      key: 'status' 
    },
    { 
      title: 'Ngày bắt đầu', 
      dataIndex: 'start_date', 
      key: 'start_date' 
    },
  ];

  // Columns cho bảng khóa học
  const programColumns = [
    {
      title: 'Tên khóa học',
      dataIndex: 'brand_name',
      key: 'brand_name',
      render: (text, record) => (
        <Link to={`/programs/${record.program_id}`}>{text}</Link>
      ),
    },
    { 
      title: 'Mô tả', 
      dataIndex: 'description', 
      key: 'description' 
    },
  ];

  return (
    <Row gutter={[16, 16]} className="mt-4">
      <Col xs={24} md={12}>
        <h3 className="dashboard-section-title">Lớp học gần đây</h3>
        <Table
          dataSource={recentClasses}
          columns={classColumns}
          rowKey="class_id"
          pagination={false}
        />
      </Col>
      <Col xs={24} md={12}>
        <h3 className="dashboard-section-title">Khóa học gần đây</h3>
        <Table
          dataSource={recentPrograms}
          columns={programColumns}
          rowKey="program_id"
          pagination={false}
        />
      </Col>
    </Row>
  );
};

export default DashboardTables;