import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Card, Tag, Space, Spin} from 'antd';
import { fetchScoresByUser } from '../../../stores/Score/scoreAPI';

const ScoreStudentPage = () => {
  const dispatch = useDispatch();
  const { scoresList, loading } = useSelector((state) => state.scores);

  const [userId] = useState('12345'); // ID của sinh viên (có thể lấy từ auth hoặc props)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchScoresByUser(userId, '', currentPage, pageSize));
  }, [dispatch, userId, currentPage, pageSize]);

  const columns = [
    {
      title: 'Môn học',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Loại điểm',
      dataIndex: 'type',
      key: 'type',
      render: (type) => {
        const colorMap = {
          quiz: 'blue',
          exam: 'red',
          homework: 'green',
        };
        return <Tag color={colorMap[type]}>{type.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Điểm',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => new Date(date).toLocaleDateString('vi-VN'),
    },
  ];

  const pagination = {
    current: currentPage,
    pageSize,
    total: scoresList?.totalItems || 0,
    onChange: (page) => setCurrentPage(page),
  };

  return (
    <div style={{ padding: '16px' }}>
      <Card title="Thông tin điểm số" bordered={false}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin size="large" />
          </div>
        ) : scoresList?.scores?.length > 0 ? (
          <Table
            columns={columns}
            dataSource={scoresList.scores}
            rowKey="id"
            pagination={pagination}
            bordered
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Không có dữ liệu điểm số.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ScoreStudentPage;