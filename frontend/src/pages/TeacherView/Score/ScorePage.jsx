import React, { useState} from 'react';
import { Table, Button, Space, Card, Input, message, Select, Form, InputNumber } from 'antd';
import { DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const { Option } = Select;

const mockClasses = [
  { id: 1, name: 'Lớp 1' },
  { id: 2, name: 'Lớp 2' },
];

const mockStudents = [
  { id: 'S1', name: 'Nguyễn Văn A', classes: [{ id: 1 }] },
  { id: 'S2', name: 'Trần Thị B', classes: [{ id: 1 }] },
  { id: 'S3', name: 'Lê Minh C', classes: [{ id: 2 }] },
  { id: 'S4', name: 'Phạm Thanh D', classes: [{ id: 2 }] },
  { id: 'S5', name: 'Hoàng Đức E', classes: [{ id: 1 }] },
  { id: 'S6', name: 'Bùi Thị F', classes: [{ id: 1 }] },
  { id: 'S7', name: 'Đỗ Quang G', classes: [{ id: 2 }] },
  { id: 'S8', name: 'Vũ Minh H', classes: [{ id: 2 }] },
  { id: 'S9', name: 'Nguyễn Hoàng I', classes: [{ id: 1 }] },
  { id: 'S10', name: 'Lê Hữu K', classes: [{ id: 2 }] },
];

const mockScores = [
  { studentId: 'S1', subject: 'math', type: 'exam', score: 8 },
  { studentId: 'S2', subject: 'math', type: 'exam', score: 7 },
  { studentId: 'S3', subject: 'math', type: 'exam', score: 9 },
  { studentId: 'S4', subject: 'math', type: 'exam', score: 6 },
  { studentId: 'S5', subject: 'math', type: 'exam', score: 10 },
  { studentId: 'S6', subject: 'math', type: 'exam', score: 5 },
  { studentId: 'S7', subject: 'math', type: 'exam', score: 7.5 },
  { studentId: 'S8', subject: 'math', type: 'exam', score: 6.5 },
  { studentId: 'S9', subject: 'math', type: 'exam', score: 8.5 },
  { studentId: 'S10', subject: 'math', type: 'exam', score: 7 },
];

const ScorePage = () => {
  const [selectedClassId, setSelectedClassId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();

  const [studentsList, setStudentsList] = useState(mockStudents);
  const [classesList, setClassesList] = useState(mockClasses);
  const [scoresList, setScoresList] = useState(mockScores);

  const classStudents = studentsList.filter(student => 
    student.classes.some(c => c.id === selectedClassId)
  );

  const mergedData = classStudents.map(student => {
    const studentScores = scoresList.filter(score => score.studentId === student.id);
    return {
      key: student.id,
      ...student,
      scores: studentScores,
    };
  });

  const handleClassChange = (value) => {
    setSelectedClassId(value);
    setEditingKey('');
  };

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: record.name,
      studentId: record.id,
      ...record.scores.reduce((acc, score) => {
        acc[`${score.subject}_${score.type}`] = score.score;
        return acc;
      }, {})
    });
    setEditingKey(record.key);
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const scoresToUpdate = Object.entries(row)
        .filter(([key]) => key.includes('_'))
        .map(([key, value]) => {
          const [subject, type] = key.split('_');
          return {
            studentId: id,
            subject,
            type,
            score: value,
            classId: selectedClassId
          };
        });

      // mock saving the updated scores
      setScoresList(prevScores => [
        ...prevScores.filter(score => !scoresToUpdate.some(update => update.studentId === score.studentId && update.subject === score.subject && update.type === score.type)),
        ...scoresToUpdate,
      ]);
      message.success('Cập nhật điểm thành công');
      setEditingKey('');
    } catch (errInfo) {
      console.error('Validate Failed:', errInfo);
      message.error('Cập nhật điểm thất bại');
    }
  };

  const columns = [
    {
      title: 'Mã HS',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      fixed: 'left',
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      render: (text) => <span>{text || 'N/A'}</span>,
    },
    {
      title: 'Test',
      dataIndex: 'math_exam',
      key: 'math_exam',
      render: (_, record) => {
        const editing = isEditing(record);
        const score = record.scores?.find(s => s.subject === 'math' && s.type === 'exam');
        return editing ? (
          <Form.Item name="math_exam" style={{ margin: 0 }}>
            <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
          </Form.Item>
        ) : (
          <span>{score?.score ?? '-'}</span>
        );
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button onClick={() => save(record.id)} type="primary" size="small">Lưu</Button>
            <Button onClick={() => setEditingKey('')} size="small">Hủy</Button>
          </Space>
        ) : (
          <Button onClick={() => edit(record)} size="small">Sửa</Button>
        );
      },
    },
  ];

  return (
    <div className="score-page" style={{ padding: '20px' }}>
      <Card
        title="Quản lý điểm số"
        extra={<Button icon={<DownloadOutlined />} onClick={() => console.log('Export Excel')}>Xuất Excel</Button>}
      >
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <span>Lớp học:</span>
            <Select
              placeholder="Chọn lớp học"
              style={{ width: 200 }}
              value={selectedClassId}
              onChange={handleClassChange}
            >
              {classesList.map(cls => (
                <Option key={cls.id} value={cls.id}>{cls.name}</Option>
              ))}
            </Select>
          </Space>
          <Input.Search
            placeholder="Tìm kiếm học sinh..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
        </div>

        <Form form={form} component={false}>
          <Table
            columns={columns}
            dataSource={mergedData.filter(item => 
              !searchText || 
              item.name.toLowerCase().includes(searchText.toLowerCase()) ||
              item.id.toString().includes(searchText)
            )}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            bordered
          />
        </Form>
      </Card>
    </div>
  );
};

export default ScorePage;
