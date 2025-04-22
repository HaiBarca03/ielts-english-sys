import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Card, Spin} from 'antd';
import { fetchClasses } from '../../../stores/classes/classAPI';
import { fetchPrograms } from '../../../stores/programs/programAPI';

const ClassStudentPage = () => {
  const dispatch = useDispatch();
  const { classesList, loading: classesLoading } = useSelector((state) => state.class);
  const { programsList, loading: programsLoading } = useSelector((state) => state.program);

  const [userId] = useState('12345'); // ID của học sinh (có thể lấy từ auth hoặc props)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    // Lấy danh sách lớp học của học sinh
    dispatch(fetchClasses(currentPage, pageSize, userId));
    // Lấy danh sách chương trình học
    dispatch(fetchPrograms());
  }, [dispatch, userId, currentPage, pageSize]);

  const classColumns = [
    {
      title: 'Tên Lớp',
      dataIndex: 'className',
      key: 'className',
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
    },
  ];

  const programColumns = [
    {
      title: 'Tên Chương Trình',
      dataIndex: 'programName',
      key: 'programName',
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
    },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <Card title="Danh sách lớp học" bordered={false} style={{ marginBottom: '16px' }}>
        {classesLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
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
              total: classesList?.totalItems || 0,
              onChange: (page) => setCurrentPage(page),
            }}
            bordered
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Không có dữ liệu lớp học.</p>
          </div>
        )}
      </Card>

      <Card title="Danh sách chương trình học" bordered={false}>
        {programsLoading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin size="large" />
          </div>
        ) : programsList?.length > 0 ? (
          <Table
            columns={programColumns}
            dataSource={programsList}
            rowKey="programId"
            bordered
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Không có dữ liệu chương trình học.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ClassStudentPage;