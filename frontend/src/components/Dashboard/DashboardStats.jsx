import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { UserOutlined, TeamOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const DashboardStats = ({ studentCount, teacherCount, classCount, programCount }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={6}>
        <Link to="/students">
          <Card className="dashboard-card" hoverable>
            <Statistic title="Học viên" value={studentCount} prefix={<UserOutlined />} />
          </Card>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Link to="/teachers">
          <Card className="dashboard-card" hoverable>
            <Statistic title="Giáo viên" value={teacherCount} prefix={<TeamOutlined />} />
          </Card>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Link to="/classes">
          <Card className="dashboard-card" hoverable>
            <Statistic title="Lớp học" value={classCount} prefix={<CalendarOutlined />} />
          </Card>
        </Link>
      </Col>
      <Col xs={24} sm={12} md={6}>
        <Link to="/programs">
          <Card className="dashboard-card" hoverable>
            <Statistic title="Khóa học" value={programCount} prefix={<BookOutlined />} />
          </Card>
        </Link>
      </Col>
    </Row>
  );
};

export default DashboardStats;