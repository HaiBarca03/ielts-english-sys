import React, { useEffect, useState, useMemo } from 'react';
import { message, Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { getMyClasses } from '../../stores/users/userAPI';

const statusColors = {
  NotFull: 'blue',
  Full: 'red',
  InProgress: 'green',
  Completed: 'gray',
};

const ClassByIdTeacher = ({
  loading = false,
  pagination = {},
  onSelectItems = () => {},
  onPageChange = () => {},
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [enhancedItems, setEnhancedItems] = useState([]);

  useEffect(() => {
    const fetchMyClasses = async () => {
      try {
        const response = await dispatch(getMyClasses());
        if (response?.userClass) {
          const transformedItems = response.userClass.map((item) => ({
            class_id: item.class_id,
            name: item.name,
            _programName: item.Program?.brand_name || '--',
            status: item.status,
            max_capacity: item.max_capacity,
            start_date: item.start_date,
            end_date: item.end_date,
          }));
          setEnhancedItems(transformedItems);
        }
      } catch (error) {
        message.error('Không thể tải danh sách lớp học');
        console.error('Error fetching my classes:', error);
      }
    };

    fetchMyClasses();
  }, [dispatch]);

  // Define table columns
  const columns = useMemo(
    () => [
      {
        title: 'Tên lớp',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        render: (text, record) => (
          <a onClick={() => navigate(`/teacher/classes/${record.class_id}`)}>{text}</a>
        ),
      },
      {
        title: 'Tên khóa học',
        dataIndex: '_programName',
        key: 'program_name',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        filters: [
          { text: 'Còn chỗ', value: 'NotFull' },
          { text: 'Đã đầy', value: 'Full' },
          { text: 'Đang học', value: 'InProgress' },
          { text: 'Đã kết thúc', value: 'Completed' },
        ],
        onFilter: (value, record) => record.status === value,
        render: (status) => (
          <Tag color={statusColors[status] || 'default'}>
            {status === 'NotFull'
              ? 'Còn chỗ'
              : status === 'Full'
              ? 'Đã đầy'
              : status === 'InProgress'
              ? 'Đang học'
              : 'Đã kết thúc'}
          </Tag>
        ),
      },
      {
        title: 'Số lượng',
        key: 'capacity',
        align: 'center',
        render: (_, record) => `${record._studentCount || 0}/${record.max_capacity || '--'}`,
      },
      {
        title: 'Ngày bắt đầu',
        dataIndex: 'start_date',
        key: 'start_date',
        render: (date) => (date ? moment(date).format('DD/MM/YYYY') : '--'),
      },
      {
        title: 'Ngày kết thúc',
        dataIndex: 'end_date',
        key: 'end_date',
        render: (date) => (date ? moment(date).format('DD/MM/YYYY') : '--'),
      },
    ],
    [navigate]
  );

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, selectedRows) => {
      setSelectedRowKeys(keys);
      onSelectItems(selectedRows);
    },
  };

  return (
    <Table
      className="header-custom-bg"
      columns={columns}
      rowSelection={rowSelection}
      dataSource={enhancedItems}
      loading={loading}
      rowKey="class_id"
      pagination={pagination}
      onChange={(pagination) => onPageChange(pagination.current)}
      onRow={(record) => ({
        onClick: () => navigate(`/classes/teacher/${record.class_id}`),
      })}
    />
  );
};

export default ClassByIdTeacher;