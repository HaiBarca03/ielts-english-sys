import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Tag, Space, Card, Input, message, Select, Modal, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SaveOutlined } from '@ant-design/icons';
import { fetchScoresByClass, createScore, updateScore, deleteScore } from '../../../stores/Score/scoreAPI';

const { Option } = Select;

const ScorePage = () => {
  const dispatch = useDispatch();
  const { scoresList, loading } = useSelector((state) => state.score);

  const [students, setStudents] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentScore, setCurrentScore] = useState(null);
  const [form] = Form.useForm();

  // Fetch scores when class changes
  useEffect(() => {
    if (selectedClassId) {
      dispatch(fetchScoresByClass(selectedClassId));
    }
  }, [selectedClassId, dispatch]);

  // Update students list when scoresList changes
  useEffect(() => {
    if (scoresList && scoresList.length > 0) {
      setStudents(scoresList);
    } else {
      setStudents([]);
    }
  }, [scoresList]);

  const handleClassChange = (value) => {
    setSelectedClassId(value);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleAddScore = () => {
    setCurrentScore(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEditScore = (record) => {
    setCurrentScore(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDeleteScore = async (id) => {
    await dispatch(deleteScore(id));
    message.success('Xóa điểm thành công');
    dispatch(fetchScoresByClass(selectedClassId));
  };

  const handleSaveScore = async () => {
    try {
      const values = await form.validateFields();
      if (currentScore) {
        await dispatch(updateScore(currentScore.id, values));
        message.success('Cập nhật điểm thành công');
      } else {
        await dispatch(createScore({ ...values, classId: selectedClassId }));
        message.success('Thêm điểm thành công');
      }
      setIsModalOpen(false);
      dispatch(fetchScoresByClass(selectedClassId));
    } catch (error) {
      message.error('Vui lòng kiểm tra lại thông tin');
    }
  };

  const filteredStudents = students.filter((student) =>
    student.name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
    },
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
      title: 'Hành động',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEditScore(record)}>
            Sửa
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDeleteScore(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="score-page" style={{ padding: '20px' }}>
      <Card
        title="Quản lý điểm số"
        extra={
          <Button icon={<PlusOutlined />} type="primary" onClick={handleAddScore}>
            Thêm điểm
          </Button>
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
              {/* Thay thế bằng danh sách lớp học thực tế */}
              <Option value="1">Lớp 10A1</Option>
              <Option value="2">Lớp 11B2</Option>
              <Option value="3">Lớp 12C3</Option>
            </Select>
          </Space>

          <Input
            placeholder="Tìm kiếm học sinh..."
            value={searchText}
            onChange={handleSearch}
            style={{ width: 250 }}
          />
        </div>

        <Table
          columns={columns}
          dataSource={filteredStudents}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title={currentScore ? 'Sửa điểm' : 'Thêm điểm'}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Hủy
          </Button>,
          <Button key="save" type="primary" icon={<SaveOutlined />} onClick={handleSaveScore}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>
          <Form.Item
            label="Môn học"
            name="subject"
            rules={[{ required: true, message: 'Vui lòng nhập môn học' }]}
          >
            <Input placeholder="Nhập môn học" />
          </Form.Item>
          <Form.Item
            label="Loại điểm"
            name="type"
            rules={[{ required: true, message: 'Vui lòng chọn loại điểm' }]}
          >
            <Select placeholder="Chọn loại điểm">
              <Option value="quiz">Quiz</Option>
              <Option value="exam">Exam</Option>
              <Option value="homework">Homework</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Điểm"
            name="score"
            rules={[{ required: true, message: 'Vui lòng nhập điểm' }]}
          >
            <Input type="number" placeholder="Nhập điểm" min={0} max={100} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ScorePage;