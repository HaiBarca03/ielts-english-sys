import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Space, Card, Input, Select, Modal, Form, message, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, FileExcelOutlined, UploadOutlined, SaveOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Option } = Select;

// Mock data
const mockClasses = [
  { id: '1', name: 'Lớp 1' },
  { id: '2', name: 'Lớp 2' },
  { id: '3', name: 'Lớp 3' },
];

const mockAttendanceList = [
  {
    key: '1',
    name: 'Nguyễn Văn An',
    status: 'Có mặt',
    date: '2025-04-20',
  },
  {
    key: '2',
    name: 'Trần Thị Bình',
    status: 'Vắng mặt',
    date: '2025-04-20',
  },
  {
    key: '3',
    name: 'Lê Văn Cường',
    status: 'Đi trễ',
    date: '2025-04-20',
  },
  {
    key: '4',
    name: 'Phạm Thị Duyên',
    status: 'Có mặt',
    date: '2025-04-20',
  },
];

const Attendance = () => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Giả lập dữ liệu điểm danh khi chọn lớp
  useEffect(() => {
    if (selectedClass) {
      setLoading(true);
      // Giả lập độ trễ như gọi API
      setTimeout(() => {
        setAttendanceList(mockAttendanceList);
        setLoading(false);
      }, 500);
    } else {
      setAttendanceList([]);
    }
  }, [selectedClass]);

  const handleClassChange = (value) => {
    setSelectedClass(value);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      ...record,
      date: moment(record.date),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (key) => {
    try {
      // Giả lập xóa bản ghi
      setAttendanceList(prevList => prevList.filter(item => item.key !== key));
      message.success('Xóa thành công!');
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
        // Cập nhật bản ghi trong mock data
        setAttendanceList(prevList =>
          prevList.map(item =>
            item.key === currentRecord.key ? { ...item, ...formattedValues } : item
          )
        );
        message.success('Cập nhật thành công!');
      }

      setIsModalOpen(false);
    } catch (error) {
      message.error('Lưu thất bại!');
    }
  };

  const handleImport = () => {
    // Giả lập chức năng import
    message.info('Chức năng nhập dữ liệu đang được phát triển!');
  };

  const handleExport = () => {
    // Giả lập chức năng export
    message.info('Chức năng xuất Excel đang được phát triển!');
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
          <Space>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={handleImport}
            >
              Import
            </Button>
            <Button
              type="primary"
              icon={<FileExcelOutlined />}
              onClick={handleExport}
            >
              Export
            </Button>
          </Space>
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
              {mockClasses.map(cls => (
                <Option key={cls.id} value={cls.id}>
                  {cls.name}
                </Option>
              ))}
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
        title="Chỉnh sửa thông tin điểm danh"
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