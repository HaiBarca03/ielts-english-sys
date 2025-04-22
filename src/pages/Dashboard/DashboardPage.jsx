import React, { useEffect, useState, useMemo } from 'react';
import { Row, Col, Card, Statistic, Spin, Table, Alert } from 'antd';
import { UserOutlined, TeamOutlined, BookOutlined, CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClasses } from '../../stores/classes/classAPI';
import { fetchPrograms } from '../../stores/programs/programAPI';
import { getStudentByRole, getTeacherByRole } from '../../stores/users/userAPI';
import { Line } from '@ant-design/plots';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const { classesList } = useSelector((state) => state.class);
  const { programsList } = useSelector((state) => state.program);
  const { usersList: students } = useSelector((state) => state.user);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setFetchError(null);

      try {
        await Promise.all([
          dispatch(fetchClasses()),
          dispatch(fetchPrograms()),
          dispatch(getStudentByRole()),
          dispatch(getTeacherByRole()).then((res) => {
            setTeachers(res.payload || []);
          }),
        ]);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
        setFetchError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const recentClasses = useMemo(
    () => (Array.isArray(classesList) ? classesList.slice(0, 5) : []),
    [classesList]
  );

  const recentPrograms = useMemo(
    () => (Array.isArray(programsList) ? programsList.slice(0, 5) : []),
    [programsList]
  );

  const lineConfig = useMemo(() => ({
    data: [
      { month: 'Tháng 1', value: 30 },
      { month: 'Tháng 2', value: 40 },
      { month: 'Tháng 3', value: 35 },
      { month: 'Tháng 4', value: 50 },
      { month: 'Tháng 5', value: 49 },
      { month: 'Tháng 6', value: 60 },
      { month: 'Tháng 7', value: 30 },
      { month: 'Tháng 8', value: 40 },
      { month: 'Tháng 9', value: 35 },
      { month: 'Tháng 10', value: 50 },
      { month: 'Tháng 11', value: 49 },
      { month: 'Tháng 12', value: 60 },
    ],
    xField: 'month',
    yField: 'value',
    color: '#52c41a',
    point: {
      size: 5,
      shape: 'diamond',
    },
    height: 400, // Tăng chiều cao biểu đồ
  }), []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="dashboard-error">
        <Alert message={fetchError} type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Dashboard</h2>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card
            className="dashboard-card"
            hoverable
            onClick={() => navigate('/student')}
          >
            <Statistic title="Học viên" value={120} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            className="dashboard-card"
            hoverable
            onClick={() => navigate('/teacher')}
          >
            <Statistic title="Giáo viên" value={45} prefix={<TeamOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            className="dashboard-card"
            hoverable
            onClick={() => navigate('/class')}
          >
            <Statistic title="Lớp học" value={30} prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            className="dashboard-card"
            hoverable
            onClick={() => navigate('/program')}
          >
            <Statistic title="Khóa học" value={20} prefix={<BookOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={24} md={24}>
          <h3 className="dashboard-section-title">Thống kê theo tháng</h3>
          <Line {...lineConfig} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4">
        <Col xs={12} md={12}>
          <h3 className="dashboard-section-title">Lớp học gần đây</h3>
          <Table
            dataSource={recentClasses}
            columns={[
              { title: 'Tên lớp', dataIndex: 'name', key: 'name' },
              { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
              { title: 'Ngày bắt đầu', dataIndex: 'start_date', key: 'start_date' },
            ]}
            rowKey="class_id"
            pagination={false}
          />
        </Col>
        <Col xs={12} md={12}>
          <h3 className="dashboard-section-title">Khóa học gần đây</h3>
          <Table
            dataSource={recentPrograms}
            columns={[
              { title: 'Tên khóa học', dataIndex: 'brand_name', key: 'brand_name' },
              { title: 'Mô tả', dataIndex: 'description', key: 'description' },
            ]}
            rowKey="program_id"
            pagination={false}
          />
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
