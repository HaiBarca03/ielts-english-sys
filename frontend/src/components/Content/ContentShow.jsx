import React, { useState } from 'react';
import { Spin, Table, Button } from 'antd';
import ContentView from './ContentView'; 

const ContentShow = ({ items, loading, onSelectItems, pagination, onPageChange, onFilterChange }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleOpenModal = (record) => {
    setSelectedContent(record);
    setOpenModal(true);
  };

  const columns = [
    {
      title: <span style={{ fontWeight: 'bold' }}>Nội dung khóa học</span>,
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
      render: (text, record) => (
        <Button type="link" onClick={() => handleOpenModal(record)} style={{ padding: 0, color: '#1677ff' }}>
          {text}
        </Button>
      )
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Bài học',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Test', value: 'Test' },
        { text: 'Lesson', value: 'Lesson' },
        { text: 'Practice', value: 'Practice' },
      ],
    },
    {
      title: 'Liên kết Tải File',
      dataIndex: 'file_url',
      key: 'file_url',
      render: (text) => text ? <a href={text} target="_blank" rel="noopener noreferrer">Tải về</a> : 'Không có file',
    },
    {
      title: 'Liên kết YouTube',
      dataIndex: 'youtube_url',
      key: 'youtube_url',
      render: (text) => text ? <a href={text} target="_blank" rel="noopener noreferrer">Xem video</a> : 'Không có link',
    },
    {
      title: 'Thời gian',
      dataIndex: 'duration',
      key: 'duration',
      render: (text) => `${text} phút`,
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => new Date(text).toLocaleString(),
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
          className="header-custom-bg"
          columns={columns}
          rowSelection={rowSelection}
          dataSource={items}
          loading={loading}
          rowKey="content_id"
          pagination={pagination}
          onChange={(pagination, filters) => {
            if (filters.type) {
              onFilterChange(filters.type[0] || '');
            }
            onPageChange(pagination.current);
          }}
        />
      <ContentView
        open={openModal}
        onClose={() => setOpenModal(false)}
        content={selectedContent}
      />
    </div>
  );
};

export default ContentShow;
