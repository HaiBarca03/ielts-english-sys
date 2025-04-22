import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Card, Tag, Spin} from 'antd';
import { fetchAttendanceByUser } from '../../../stores/Attendance/attendanceAPI';

const AttendentStudentPage = () => {
  const dispatch = useDispatch();
  const { attendanceList, loading } = useSelector((state) => state.attendance);

  const [userId] = useState('12345'); // ID của sinh viên (có thể lấy từ auth hoặc props)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchAttendanceByUser(userId, currentPage, pageSize));
  }, [dispatch, userId, currentPage, pageSize]);

  const columns = [
    {
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = '';
        switch (status) {
          case 'Có mặt':
            color = 'green';
            break;
          case 'Vắng mặt':
            color = 'red';
            break;
          case 'Đi trễ':
            color = 'orange';
            break;
          default:
            color = 'blue';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      render: (note) => note || 'Không có ghi chú',
    },
  ];

  const pagination = {
    current: currentPage,
    pageSize,
    total: attendanceList?.totalItems || 0,
    onChange: (page) => setCurrentPage(page),
  };

  return (
    <div style={{ padding: '16px' }}>
      <Card title="Thông tin điểm danh" bordered={false}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin size="large" />
          </div>
        ) : attendanceList?.attendances?.length > 0 ? (
          <Table
            columns={columns}
            dataSource={attendanceList.attendances}
            rowKey="id"
            pagination={pagination}
            bordered
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Không có dữ liệu điểm danh.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AttendentStudentPage;