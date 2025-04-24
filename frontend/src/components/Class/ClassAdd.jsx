import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Row, Col, InputNumber, DatePicker, TimePicker, Button, Radio } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { 
  addUserToClass, 
  createClass 
} from '../../stores/classes/classAPI';
import { createSchedule } from '../../stores/Schedules/schedulesAPI';
import { fetchPrograms } from '../../stores/programs/programAPI'; 
import { getTeacherByRole } from '../../stores/users/userAPI';

const { Option } = Select;
const { TextArea } = Input;

const SCHEDULE_TYPES = [
  { value: '2-4-6-s', label: 'Sáng 2-4-6' },
  { value: '2-4-6-c', label: 'Chiều 2-4-6' },
  { value: '2-4-6-t', label: 'Tối 2-4-6' },
  { value: '3-5-7-s', label: 'Sáng 3-5-7' },
  { value: '3-5-7-c', label: 'Chiều 3-5-7' },
  { value: '3-5-7-t', label: 'Tối 3-5-7' },
];

const ClassAdd = ({ show, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [scheduleType, setScheduleType] = useState('2-4-6-s');
  const [showCustomSchedule, setShowCustomSchedule] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [teachers, setTeachers] = useState([]);


  useEffect(() => {
    const loadData = async () => {
      if (!show) return;
      
      try {
        setLoadingPrograms(true);
        setLoadingTeachers(true);
        
        // Load programs
        const programsResponse = await dispatch(fetchPrograms());
        const programsData = programsResponse.payload?.data || programsResponse.items || programsResponse;
        if (Array.isArray(programsData)) {
          setPrograms(programsData);
        }
        
        // Load teachers
        const teachersResponse = await dispatch(getTeacherByRole());
        const teachersData = teachersResponse.users || teachersResponse.data || teachersResponse.payload || [];
        if (Array.isArray(teachersData)) {
          setTeachers(teachersData);
        }
        console.log('Teachers:', teachersData);
      } catch (error) {
        console.error('Failed to load data:', error);
        toast.error('Không thể tải dữ liệu!');
      } finally {
        setLoadingPrograms(false);
        setLoadingTeachers(false);
      }
    };

    loadData();
  }, [dispatch, show]);


  const generateDefaultSchedule = (startDate, type) => {
    const days = type.startsWith('2-4-6') ? [2, 4, 6] : [3, 5, 7];
    const baseDate = moment(startDate).startOf('week');

    return days.map(day => {
      const date = baseDate.clone().day(day);
      const timeSuffix = type.split('-').pop();

      let startTime, endTime;
      switch (timeSuffix) {
        case 's': // Morning
          startTime = moment().set({ hour: 8, minute: 0 });
          endTime = moment().set({ hour: 11, minute: 0 });
          break;
        case 'c': // Afternoon
          startTime = moment().set({ hour: 13, minute: 30 });
          endTime = moment().set({ hour: 16, minute: 30 });
          break;
        case 't': // Evening
          startTime = moment().set({ hour: 18, minute: 0 });
          endTime = moment().set({ hour: 21, minute: 0 });
          break;
        default:
          startTime = moment().set({ hour: 8, minute: 0 });
          endTime = moment().set({ hour: 11, minute: 0 });
      }

      return {
        date,
        startTime,
        endTime
      };
    });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // 1. Create new class
      const classData = {
        program_id: values.program_id,
        name: values.className,
        max_capacity: values.capacity,
        start_date: values.startDate.format('YYYY-MM-DD'),
        end_date: values.endDate.format('YYYY-MM-DD'),
      };
      const result = await dispatch(createClass(classData));


      const newClassId = result.class_id;

  
      // 2. Add teacher to class
     
      if (values.user_id) {
        const addUserResult = await dispatch(addUserToClass(newClassId, values.user_id));
        if (!addUserResult) {
          throw new Error('Failed to add teacher to class');
        }
      }

      // 3. Create schedules
      let scheduleDays = [];
      if (showCustomSchedule) {
        scheduleDays = values.scheduleDays || [];
      } else {
        scheduleDays = generateDefaultSchedule(values.startDate, scheduleType);
      }

      const schedulePromises = scheduleDays.map(day => {
        const payload = {
          class_id: newClassId,
          teacher_id: values.user_id,
          date: day.date.format('YYYY-MM-DD'),
          start_time: day.startTime.format('HH:mm'),
          end_time: day.endTime.format('HH:mm'),
          room: values.room,
          type: scheduleType,
        };
        console.log('Payload for createSchedule:', payload);
        return dispatch(createSchedule(payload));
      });

      await Promise.all(schedulePromises);

      toast.success('Tạo lớp học và lịch học thành công!');
      form.resetFields();
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Đã có lỗi xảy ra khi tạo lớp học!');
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleTypeChange = (e) => {
    setScheduleType(e.target.value);
    setShowCustomSchedule(false);
  };

  return (
    <Modal
      title="Thêm Lớp Học Mới"
      open={show}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Tạo mới"
      cancelText="Hủy"
      width={800}
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          status: 'active',
          capacity: 30,
        }}
      >
        <Row gutter={16}>
        <Col span={12}>
            <Form.Item
              name="program_id"
              label="Chương trình học"
              rules={[{ required: true, message: 'Vui lòng chọn chương trình' }]}
            >
              <Select
                loading={loadingPrograms}
                placeholder="Chọn chương trình"
                showSearch
                optionFilterProp="children"
              >
                {programs.map(program => (
                  <Option key={program.program_id} value={program.program_id}>
                    {program.brand_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="className"
              label="Tên lớp học"
              rules={[{ required: true, message: 'Vui lòng nhập tên lớp học' }]}
            >
              <Input placeholder="Nhập tên lớp học" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="user_id"
              label="Giáo viên"
              rules={[{ required: true, message: 'Vui lòng chọn giáo viên' }]}
            >
              <Select
                loading={loadingTeachers}
                placeholder="Chọn giáo viên"
                showSearch
                optionFilterProp="children"
              >
                {teachers.map(teacher => (
                  <Option key={teacher.user_id} value={teacher.user_id}>
                    {teacher.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="capacity"
              label="Sĩ số tối đa"
              rules={[{
                required: true,
                message: 'Vui lòng nhập sĩ số tối đa',
                type: 'number',
                min: 1,
                max: 100
              }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Nhập sĩ số"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="startDate"
              label="Ngày bắt đầu"
              rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                disabledDate={(current) => current && current < moment().startOf('day')}
                placeholder="Chọn ngày bắt đầu"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="endDate"
              label="Ngày kết thúc"
              rules={[
                { required: true, message: 'Vui lòng chọn ngày kết thúc' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('startDate') <= value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Ngày kết thúc phải sau ngày bắt đầu'));
                  },
                }),
              ]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                disabledDate={(current) => current && current < moment().startOf('day')}
                placeholder="Chọn ngày kết thúc"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="room"
              label="Phòng học"
              rules={[{ required: true, message: 'Vui lòng nhập phòng học' }]}
            >
              <Input placeholder="VD: P501" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Loại lịch học">
              <Radio.Group
                onChange={handleScheduleTypeChange}
                value={scheduleType}
                optionType="button"
                buttonStyle="solid"
              >
                {SCHEDULE_TYPES.map(type => (
                  <Radio.Button key={type.value} value={type.value}>
                    {type.label}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
          </Col>


          <Col span={24}>
            <Form.Item name="description" label="Ghi chú">
              <TextArea rows={3} placeholder="Nhập ghi chú (nếu có)" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ClassAdd;