import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Tag, Space, Card, Avatar, Input, message, DatePicker, Select } from 'antd';
import { 
  CheckCircleOutlined, 
  CloseCircleOutlined, 
  UserOutlined,
  SearchOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import moment from 'moment';
import { fetchAttendanceByClass, createAttendance, updateAttendance } from '../../../stores/Attendance/attendanceAPI';
import { getMyClasses } from '../../../stores/users/userAPI';

const { Option } = Select;

const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  LATE: 'Late'
};

const STATUS_CONFIG = {
  [ATTENDANCE_STATUS.PRESENT]: { color: 'green', text: 'Có mặt', icon: <CheckCircleOutlined /> },
  [ATTENDANCE_STATUS.ABSENT]: { color: 'red', text: 'Vắng', icon: <CloseCircleOutlined /> },
  [ATTENDANCE_STATUS.LATE]: { color: 'orange', text: 'Đi muộn', icon: <CheckCircleOutlined /> }
};

const AttendancePage = () => {
  const dispatch = useDispatch();
  const { attendanceList, loading } = useSelector((state) => state.attendance);

  const [myClasses, setMyClasses] = useState([]); // 🔥 dùng local state
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedClassId, setSelectedClassId] = useState(null); // class_id
  const [attendanceDate, setAttendanceDate] = useState(moment());
  const [isSaving, setIsSaving] = useState(false);

  // Lấy danh sách lớp của giáo viên
  useEffect(() => {
    const fetchMyClasses = async () => {
      try {
        const response = await dispatch(getMyClasses());
        if (response?.userClass) {
          setMyClasses(response.userClass);
        }
      } catch (error) {
        message.error('Không thể tải danh sách lớp học');
        console.error(error);
      }
    };

    fetchMyClasses();
  }, [dispatch]);

  // Fetch điểm danh khi chọn lớp hoặc ngày thay đổi
  useEffect(() => {
    if (selectedClassId) {
      const dateStr = attendanceDate.format('YYYY-MM-DD');
      dispatch(fetchAttendanceByClass(selectedClassId, dateStr));
    }
  }, [selectedClassId, attendanceDate, dispatch]);

  // Update students
  useEffect(() => {
    if (attendanceList && attendanceList.length > 0) {
      setStudents(attendanceList.map(item => ({
        ...item.student,
        status: item.status,
        note: item.note,
        attendanceId: item.id
      })));
    } else if (selectedClassId) {
      setStudents([]);
    }
  }, [attendanceList, selectedClassId]);

  const selectedClassName = myClasses.find(cls => cls.class_id === selectedClassId)?.name || 'Chưa chọn lớp';

  const handleAttendanceChange = async (record, status, note = '') => {
    setIsSaving(true);
    try {
      const attendanceData = {
        schedule_id: selectedClassId,
        user_id: record.id,
        status,
        date: attendanceDate.format('YYYY-MM-DD'),
        note
      };

      if (record.attendanceId) {
        await dispatch(updateAttendance(record.attendanceId, attendanceData));
        message.success('Cập nhật điểm danh thành công');
      } else {
        await dispatch(createAttendance(attendanceData));
        message.success('Điểm danh thành công');
      }
    } catch (error) {
      message.error(error?.response?.data?.message || 'Thao tác thất bại');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClassChange = (value) => {
    setSelectedClassId(value);
  };

  const filteredStudents = students.filter(student =>
    student.name?.toLowerCase().includes(searchText.toLowerCase()) ||
    student.studentId?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar || `https://i.pravatar.cc/150?u=${record.id}`} icon={<UserOutlined />} />
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={STATUS_CONFIG[status]?.color || 'default'} icon={STATUS_CONFIG[status]?.icon}>
          {STATUS_CONFIG[status]?.text || 'Chưa điểm danh'}
        </Tag>
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      render: (text) => text || '--',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type={record.status === ATTENDANCE_STATUS.PRESENT ? 'primary' : 'default'}
            size="small"
            onClick={() => handleAttendanceChange(record, ATTENDANCE_STATUS.PRESENT)}
            icon={<CheckCircleOutlined />}
            loading={isSaving}
          >
            Có mặt
          </Button>
          <Button
            danger={record.status === ATTENDANCE_STATUS.ABSENT}
            size="small"
            onClick={() => handleAttendanceChange(record, ATTENDANCE_STATUS.ABSENT)}
            icon={<CloseCircleOutlined />}
            loading={isSaving}
          >
            Vắng
          </Button>
          <Button
            type={record.status === ATTENDANCE_STATUS.LATE ? 'primary' : 'default'}
            size="small"
            onClick={() => handleAttendanceChange(record, ATTENDANCE_STATUS.LATE)}
            loading={isSaving}
          >
            Muộn
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="attendance-page" style={{ padding: '20px' }}>
      <Card 
        title={<Space>Điểm danh sinh viên {loading && <LoadingOutlined />}</Space>}
        extra={
          <Space>
            <Button icon={<FileExcelOutlined />}>Xuất Excel</Button>
            <Button icon={<PrinterOutlined />}>In báo cáo</Button>
          </Space>
        }
      >
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <span>Lớp học:</span>
            <Select
              placeholder="Chọn lớp học"
              style={{ width: 200 }}
              value={selectedClassId}
              onChange={handleClassChange}
              loading={loading}
            >
              {myClasses.map(cls => (
                <Option key={cls.class_id} value={cls.class_id}>
                  {cls.name}
                </Option>
              ))}
            </Select>
            <span>Ngày:</span>
            <DatePicker
              value={attendanceDate}
              onChange={(date) => setAttendanceDate(date || moment())}
              format="DD/MM/YYYY"
              style={{ width: 150 }}
              allowClear={false}
              disabled={!selectedClassId}
            />
          </Space>

          <Input
            placeholder="Tìm kiếm sinh viên..."
            prefix={<SearchOutlined />}
            style={{ width: 250 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            disabled={!selectedClassId}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <strong>Tên lớp: </strong>
          <span>{selectedClassName}</span>
        </div>

        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ y: 500 }}
          locale={{
            emptyText: selectedClassId ? 'Không có sinh viên nào trong lớp này' : 'Vui lòng chọn lớp học'
          }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={2}>
                  <strong>Tổng số:</strong>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <Tag color="blue">{students.length} sinh viên</Tag>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <Tag color="green">
                    {students.filter(s => s.status === ATTENDANCE_STATUS.PRESENT).length} có mặt
                  </Tag>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Tag color="red">
                    {students.filter(s => s.status === ATTENDANCE_STATUS.ABSENT).length} vắng
                  </Tag>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
        />

        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <Button 
            type="primary" 
            size="large"
            onClick={() => message.success('Đã lưu tất cả điểm danh')}
            disabled={!selectedClassId || loading}
            loading={loading}
          >
            Lưu tất cả
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AttendancePage;
