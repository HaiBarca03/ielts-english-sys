import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Spin } from 'antd';

// Mock data
const mockAttendanceList = {
  attendances: [
    {
      id: '1',
      date: '2025-04-20',
      status: 'Có mặt',
      note: 'Đúng giờ',
    },
    {
      id: '2',
      date: '2025-04-19',
      status: 'Vắng mặt',
      note: 'Nghỉ không phép',
    },
    {
      id: '3',
      date: '2025-04-18',
      status: 'Đi trễ',
      note: 'Muộn 15 phút',
    },
    {
      id: '4',
      date: '2025-04-17',
      status: 'Có mặt',
      note: 'Tham gia đầy đủ',
    },
    {
      id: '5',
      date: '2025-04-16',
      status: 'Có mặt',
      note: 'Tham gia đầy đủ',
    },
    {
      id: '6',
      date: '2025-04-15',
      status: 'Có mặt',
      note: 'Tham gia đầy đủ',
    },
    {
      id: '7',
      date: '2025-04-14',
      status: 'Có mặt',
      note: 'Tham gia đầy đủ',
    },
  ],
  totalItems: 4,
};

const AttendentStudentPage = () => {
  const [attendanceList, setAttendanceList] = useState(mockAttendanceList);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Giả lập lấy dữ liệu
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAttendanceList(mockAttendanceList);
      setLoading(false);
    }, 500); // Giả lập độ trễ 500ms
  }, [currentPage]);

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
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card
        title={
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Thông tin điểm danh
          </span>
        }
        bordered={false}
        style={{
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        ) : attendanceList?.attendances?.length > 0 ? (
          <Table
            columns={columns}
            dataSource={attendanceList.attendances}
            rowKey="id"
            pagination={pagination}
            bordered
            style={{ background: '#fff' }}
            scroll={{ x: true }}
            locale={{ emptyText: 'Không có dữ liệu điểm danh' }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '16px', color: '#888' }}>
              Không có dữ liệu điểm danh.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default AttendentStudentPage;