import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Tag, Button, Space, Card, Input, Select, Modal, Form, message, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';
import {
  fetchAttendanceByClass,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from '../../stores/Attendance/attendanceAPI';

const { Option } = Select;

const Attendance = () => {
  const dispatch = useDispatch();
  const { attendanceList, loading } = useSelector((state) => state.attendance);

  const [selectedClass, setSelectedClass] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedClass) {
      dispatch(fetchAttendanceByClass(selectedClass));
    }
  }, [dispatch, selectedClass]);

  const handleClassChange = (value) => {
    setSelectedClass(value);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleAdd = () => {
    setCurrentRecord(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      date: moment(record.date),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAttendance(id));
      message.success('Xóa thành công!');
      if (selectedClass) {
        dispatch(fetchAttendanceByClass(selectedClass));
      }
    } catch (error) {
      message.error('Xóa thất bại!');
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
      };

      if (currentRecord) {
        // Cập nhật bản ghi
        await dispatch(updateAttendance(currentRecord.key, formattedValues));
        message.success('Cập nhật thành công!');
      } else {
        // Thêm mới bản ghi
        await dispatch(createAttendance({ ...formattedValues, classId: selectedClass }));
        message.success('Thêm mới thành công!');
      }

      setIsModalOpen(false);
      if (selectedClass) {
        dispatch(fetchAttendanceByClass(selectedClass));
      }
    } catch (error) {
      message.error('Lưu thất bại!');
    }
  };

  const filteredData = attendanceList.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Họ và Tên',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Ngày',
      dataIndex: 'date',
      key: 'date',
      render: (date) => moment(date).format('DD/MM/YYYY'),
    },
    {
      title: 'Hành Động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            type="primary"
          >
            Sửa
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.key)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '16px' }}>
      <Card
        title="Quản lý điểm danh"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Thêm mới
          </Button>
        }
      >
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <span>Lớp học:</span>
            <Select
              placeholder="Chọn lớp học"
              style={{ width: 200 }}
              value={selectedClass}
              onChange={handleClassChange}
            >
              <Option value="1">Lớp 10A1</Option>
              <Option value="2">Lớp 11B2</Option>
              <Option value="3">Lớp 12C3</Option>
            </Select>
          </Space>
          <Input
            placeholder="Tìm kiếm học viên..."
            value={searchText}
            onChange={handleSearch}
            style={{ width: 300 }}
          />
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          bordered
          loading={loading}
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title={currentRecord ? 'Chỉnh sửa thông tin điểm danh' : 'Thêm mới điểm danh'}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Hủy
          </Button>,
          <Button key="save" type="primary" icon={<SaveOutlined />} onClick={handleSave}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Họ và Tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Trạng Thái"
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
          >
            <Select placeholder="Chọn trạng thái">
              <Option value="Có mặt">Có mặt</Option>
              <Option value="Vắng mặt">Vắng mặt</Option>
              <Option value="Đi trễ">Đi trễ</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="date"
            label="Ngày"
            rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Attendance;