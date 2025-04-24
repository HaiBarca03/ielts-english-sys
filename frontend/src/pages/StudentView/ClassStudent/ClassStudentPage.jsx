import React, { useEffect, useState } from 'react';
import { Card, Table, Spin } from 'antd';

// Mock data
const mockClassesList = [
  {
    classId: '1',
    className: 'IELTS Preparation A1',
    teacherName: 'Nguyễn Thị Lan',
    schedule: 'Thứ 2, 4, 6 (18:00 - 20:00)',
  },
  {
    classId: '2',
    className: 'General English B2',
    teacherName: 'Trần Văn Hùng',
    schedule: 'Thứ 3, 5 (19:00 - 21:00)',
  },
  {
    classId: '3',
    className: 'Business English C1',
    teacherName: 'Phạm Minh Tuấn',
    schedule: 'Thứ 7, Chủ nhật (09:00 - 11:00)',
  },
];

const mockProgramsList = [
  {
    programId: '1',
    programName: 'IELTS Intensive',
    description: 'Chương trình luyện thi IELTS chuyên sâu, tập trung vào 4 kỹ năng.',
    duration: '12 tuần',
  },
  {
    programId: '2',
    programName: 'General English',
    description: 'Cải thiện kỹ năng giao tiếp tiếng Anh hàng ngày.',
    duration: '8 tuần',
  },
  {
    programId: '3',
    programName: 'Business English',
    description: 'Tiếng Anh thương mại cho công việc và sự nghiệp.',
    duration: '10 tuần',
  },
];

const ClassStudentPage = () => {
  const [classesList, setClassesList] = useState(mockClassesList);
  const [programsList, setProgramsList] = useState(mockProgramsList);
  const [classesLoading, setClassesLoading] = useState(false);
  const [programsLoading, setProgramsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Giả lập lấy dữ liệu
  useEffect(() => {
    setClassesLoading(true);
    setProgramsLoading(true);
    setTimeout(() => {
      setClassesList(mockClassesList);
      setProgramsList(mockProgramsList);
      setClassesLoading(false);
      setProgramsLoading(false);
    }, 500); // Giả lập độ trễ 500ms
  }, [currentPage]);

  const classColumns = [
    {
      title: 'Tên Lớp',
      dataIndex: 'className',
      key: 'className',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Giáo Viên',
      dataIndex: 'teacherName',
      key: 'teacherName',
    },
    {
      title: 'Thời Gian',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (text) => <span style={{ color: '#1890ff' }}>{text}</span>,
    },
  ];

  const programColumns = [
    {
      title: 'Tên Chương Trình',
      dataIndex: 'programName',
      key: 'programName',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Mô Tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Thời Gian Học',
      dataIndex: 'duration',
      key: 'duration',
      render: (text) => <span style={{ color: '#389e0d' }}>{text}</span>,
    },
  ];

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card
        title={
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Danh sách lớp học
          </span>
        }
        bordered={false}
        style={{
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          marginBottom: '24px',
        }}
      >
        {classesLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        ) : classesList?.length > 0 ? (
          <Table
            columns={classColumns}
            dataSource={classesList}
            rowKey="classId"
            pagination={{
              current: currentPage,
              pageSize,
              total: classesList?.length || 0,
              onChange: (page) => setCurrentPage(page),
            }}
            bordered
            style={{ background: '#fff' }}
            scroll={{ x: true }}
            locale={{ emptyText: 'Không có dữ liệu lớp học' }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '16px', color: '#888' }}>
              Không có dữ liệu lớp học.
            </p>
          </div>
        )}
      </Card>

      <Card
        title={
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Danh sách chương trình học
          </span>
        }
        bordered={false}
        style={{
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        {programsLoading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        ) : programsList?.length > 0 ? (
          <Table
            columns={programColumns}
            dataSource={programsList}
            rowKey="programId"
            bordered
            style={{ background: '#fff' }}
            scroll={{ x: true }}
            locale={{ emptyText: 'Không có dữ liệu chương trình học' }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '16px', color: '#888' }}>
              Không có dữ liệu chương trình học.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClassStudentPage;