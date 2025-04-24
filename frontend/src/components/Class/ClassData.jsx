import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom'; // Add useNavigate
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getProgramById } from '../../stores/programs/programAPI';
import { getClassById } from '../../stores/classes/classAPI';

const statusColors = {
  NotFull: 'blue',
  Full: 'red',
  InProgress: 'green',
  Completed: 'gray',
};

const ClassData = ({
  items = [],
  loading = false,
  pagination = {},
  onSelectItems = () => {},
  onPageChange = () => {},
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const { programDetails } = useSelector((state) => state.program);
  const { classDetails } = useSelector((state) => state.class);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const loadedClassIdsRef = useRef(new Set());
  const loadedProgramIdsRef = useRef(new Set());

  // Fetch program details
  useEffect(() => {
    items.forEach((item) => {
      if (!loadedProgramIdsRef.current.has(item.program_id)) {
        dispatch(getProgramById(item.program_id));
        loadedProgramIdsRef.current.add(item.program_id);
      }
    });
  }, [items, dispatch]);

  // Fetch class details
  useEffect(() => {
    items.forEach((item) => {
      if (!loadedClassIdsRef.current.has(item.class_id)) {
        dispatch(getClassById(item.class_id));
        loadedClassIdsRef.current.add(item.class_id);
      }
    });
  }, [items, dispatch]);

  // Enhance items with additional data
  const enhancedItems = useMemo(() => {
    return items.map((item) => {
      const classInfo = classDetails[item.class_id] || {};
      const programInfo = programDetails[item.program_id] || {};

      const usersArray = classInfo.Users || classInfo.users || [];
      const teachers = usersArray
        .filter((user) => user.role === 'Teacher' || user.role === 'teacher')
        .map((teacher) => teacher.name);

      return {
        ...item,
        _programName: programInfo.brand_name || '--',
        _teacherName: teachers.length > 0 ? teachers.join(', ') : '--',
        _studentCount: classInfo.studentCount || 0,
      };
    });
  }, [items, classDetails, programDetails]);

  // Define table columns
  const columns = useMemo(() => [
    {
      title: 'Tên lớp',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <a onClick={() => navigate(`/classes/${record.class_id}`)}>{text}</a> // Navigate to /classes/:classId
      ),
    },
    {
      title: 'Tên khóa học',
      dataIndex: '_programName',
      key: 'program_name',
    },
    {
      title: 'Giáo viên',
      dataIndex: '_teacherName',
      key: 'teacher',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
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
      render: (_, record) => `${record._studentCount}/${record.max_capacity || '--'}`,
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
  ], [navigate]);

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
        onClick: () => navigate(`/classes/${record.class_id}`), // Navigate to /classes/:classId
      })}
    />
  );
};

export default ClassData;