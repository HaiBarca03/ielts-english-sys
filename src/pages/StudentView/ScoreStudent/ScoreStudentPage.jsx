import React, { useEffect, useState } from 'react';
import { Card, Table, Tag, Spin } from 'antd';

// Mock data
const mockScoresList = {
  scores: [
    {
      id: '1',
      subject: 'IELTS Listening',
      type: 'quiz',
      score: 7.5,
      updatedAt: '2025-04-20',
    },
    {
      id: '2',
      subject: 'IELTS Speaking',
      type: 'exam',
      score: 6.5,
      updatedAt: '2025-04-19',
    },
    {
      id: '3',
      subject: 'General English',
      type: 'homework',
      score: 8.0,
      updatedAt: '2025-04-18',
    },
    {
      id: '4',
      subject: 'Business English',
      type: 'quiz',
      score: 7.0,
      updatedAt: '2025-04-17',
    },
    {
      id: '1',
      subject: 'IELTS Listening',
      type: 'quiz',
      score: 7.5,
      updatedAt: '2025-04-20',
    },
    {
      id: '2',
      subject: 'IELTS Speaking',
      type: 'exam',
      score: 6.5,
      updatedAt: '2025-04-19',
    },
    {
      id: '3',
      subject: 'General English',
      type: 'homework',
      score: 8.0,
      updatedAt: '2025-04-18',
    },
    {
      id: '4',
      subject: 'Business English',
      type: 'quiz',
      score: 7.0,
      updatedAt: '2025-04-17',
    },
  ],
  totalItems: 8,
};

const ScoreStudentPage = () => {
  const [scoresList, setScoresList] = useState(mockScoresList);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);

  // Giả lập lấy dữ liệu
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setScoresList(mockScoresList);
      setLoading(false);
    }, 500); // Giả lập độ trễ 500ms
  }, [currentPage]);

  const columns = [
    {
      title: 'Môn học',
      dataIndex: 'subject',
      key: 'subject',
      render: (text) => <strong>{text}</strong>,
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
      render: (score) => <span style={{ color: score >= 7 ? '#389e0d' : '#cf1322' }}>{score.toFixed(1)}</span>,
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
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Card
        title={
          <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Thông tin điểm số
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
        ) : scoresList?.scores?.length > 0 ? (
          <Table
            columns={columns}
            dataSource={scoresList.scores}
            rowKey="id"
            pagination={pagination}
            bordered
            style={{ background: '#fff' }}
            scroll={{ x: true }}
            locale={{ emptyText: 'Không có dữ liệu điểm số' }}
          />
        ) : (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '16px', color: '#888' }}>
              Không có dữ liệu điểm số.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ScoreStudentPage;