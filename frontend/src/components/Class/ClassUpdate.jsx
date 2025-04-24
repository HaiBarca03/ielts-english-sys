import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Row, Col, InputNumber, DatePicker, TimePicker, Button, Radio, message } from 'antd';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchPrograms } from '../../stores/programs/programAPI'; 
import { getTeacherByRole } from '../../stores/users/userAPI';
import { updateSchedule } from '../../stores/Schedules/schedulesAPI';
import { addUserToClass, updateClass } from '../../stores/classes/classAPI';

const { Option } = Select;
const { TextArea } = Input;

const SCHEDULE_TYPES = [
  { value: '2-4-6-s', label: 'Sáng 2-4-6' },
  { value: '2-4-6-c', label: 'Chiều 2-4-6' },
  { value: '2-4-6-t', label: 'Tối 2-4-6' },
  { value: '3-5-7-s', label: 'Sáng 3-5-7' },
  { value: '3-5-7-c', label: 'Chiều 3-5-7' },
  { value: '3-5-7-t', label: 'Tối 3-5-7' },
  { value: 'custom', label: 'Tùy chỉnh' },
];

const ClassUpdate = ({ show, onClose, onSuccess, classData, schedules }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingPrograms, setLoadingPrograms] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [scheduleType, setScheduleType] = useState('2-4-6-s');
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      if (!show || !classData) return;

      try {
        setLoadingPrograms(true);
        setLoadingTeachers(true);

        // Load programs
        const programsResponse = await dispatch(fetchPrograms());
        const programsData = programsResponse.payload?.data || programsResponse.items || programsResponse;
        if (Array.isArray(programsData)) {
          setPrograms(programsData);
        } else {
          throw new Error('Invalid programs data format');
        }

        // Load teachers
        const teachersResponse = await dispatch(getTeacherByRole());
        const teachersData = teachersResponse.users || teachersResponse.data || teachersResponse.payload || [];
        if (Array.isArray(teachersData)) {
          setTeachers(teachersData);
        } else {
          throw new Error('Invalid teachers data format');
        }

        // Set initial form values
        form.setFieldsValue({
          program_id: classData.program_id,
          className: classData.name,
          user_id: classData.teacher_id,
          capacity: classData.max_capacity,
          startDate: classData.start_date ? moment(classData.start_date) : null,
          endDate: classData.end_date ? moment(classData.end_date) : null,
          room: classData.room || '',
          description: classData.description || '',
          scheduleDays: schedules?.map(schedule => ({
            schedule_id: schedule.schedule_id,
            date: moment(schedule.date),
            startTime: moment(schedule.start_time, 'HH:mm'),
            endTime: moment(schedule.end_time, 'HH:mm'),
          })) || [],
        });

        // Determine schedule type
        if (schedules?.length > 0) {
          const firstScheduleType = schedules[0].type || '2-4-6-s';
          setScheduleType(firstScheduleType);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        message.error('Không thể tải dữ liệu: ' + error.message);
      } finally {
        setLoadingPrograms(false);
        setLoadingTeachers(false);
      }
    };

    loadData();
  }, [dispatch, show, classData, schedules, form]);

  const generateDefaultSchedule = (startDate, type) => {
    if (!startDate || !type) return [];
    const days = type.startsWith('2-4-6') ? [2, 4, 6] : [3, 5, 7];
    const baseDate = moment(startDate).startOf('week');

    return days.map(day => {
      const date = baseDate.clone().day(day);
      const timeSuffix = type.split('-').pop();
      let startTime, endTime;

      switch (timeSuffix) {
        case 's':
          startTime = moment().set({ hour: 8, minute: 0 });
          endTime = moment().set({ hour: 11, minute: 0 });
          break;
        case 'c':
          startTime = moment().set({ hour: 13, minute: 30 });
          endTime = moment().set({ hour: 16, minute: 30 });
          break;
        case 't':
          startTime = moment().set({ hour: 18, minute: 0 });
          endTime = moment().set({ hour: 21, minute: 0 });
          break;
        default:
          startTime = moment().set({ hour: 8, minute: 0 });
          endTime = moment().set({ hour: 11, minute: 0 });
      }

      return { date, startTime, endTime };
    });
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // 1. Update class
      const classUpdateData = {
        program_id: values.program_id,
        name: values.className,
        max_capacity: values.capacity,
        start_date: values.startDate.format('YYYY-MM-DD'),
        end_date: values.endDate.format('YYYY-MM-DD'),
        room: values.room,
        description: values.description || '',
      };
      const updateClassResult = await dispatch(updateClass(classData.class_id, classUpdateData));
      if (!updateClassResult) {
        throw new Error('Failed to update class');
      }

      // 2. Update teacher assignment if changed
      if (values.user_id && values.user_id !== classData.teacher_id) {
        const addUserResult = await dispatch(addUserToClass(classData.class_id, values.user_id));
        if (!addUserResult) {
          throw new Error('Failed to update teacher assignment');
        }
      }

      // 3. Update schedules
      const scheduleDays = scheduleType === 'custom' ? values.scheduleDays : generateDefaultSchedule(values.startDate, scheduleType);
      if (!scheduleDays.length) {
        throw new Error('No schedules provided');
      }

      const schedulePromises = scheduleDays.map((day, index) => {
        const scheduleId = schedules[index]?.schedule_id;
        if (!scheduleId) return Promise.resolve();

        const payload = {
          class_id: classData.class_id,
          teacher_id: values.user_id,
          date: day.date.format('YYYY-MM-DD'),
          start_time: day.startTime.format('HH:mm'),
          end_time: day.endTime.format('HH:mm'),
          room: values.room,
          type: scheduleType,
        };
        return dispatch(updateSchedule(scheduleId, payload));
      });

      await Promise.all(schedulePromises);

      message.success('Cập nhật lớp học và lịch học thành công!');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Update error:', err);
      message.error(err.message || 'Đã có lỗi xảy ra khi cập nhật lớp học!');
    } finally {
      setLoading(false);
    }
  };

  const handleScheduleTypeChange = (e) => {
    setScheduleType(e.target.value);
  };

  return (
    <Modal
      title="Chỉnh Sửa Lớp Học"
      open={show}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Cập nhật"
      cancelText="Hủy"
      width={800}
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{ capacity: 30 }}
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
              rules={[{ required: true, message: 'Vui lòng nhập sĩ số tối đa', type: 'number', min: 1, max: 100 }]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Nhập sĩ số" />
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
          {scheduleType === 'custom' && (
            <Col span={24}>
              <Form.List name="scheduleDays">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Row key={key} gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'date']}
                            rules={[{ required: true, message: 'Vui lòng chọn ngày' }]}
                          >
                            <DatePicker
                              format="DD/MM/YYYY"
                              style={{ width: '100%' }}
                              placeholder="Chọn ngày"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'startTime']}
                            rules={[{ required: true, message: 'Vui lòng chọn giờ bắt đầu' }]}
                          >
                            <TimePicker
                              format="HH:mm"
                              style={{ width: '100%' }}
                              placeholder="Giờ bắt đầu"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'endTime']}
                            rules={[{ required: true, message: 'Vui lòng chọn giờ kết thúc' }]}
                          >
                            <TimePicker
                              format="HH:mm"
                              style={{ width: '100%' }}
                              placeholder="Giờ kết thúc"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Button type="link" onClick={() => remove(name)}>Xóa</Button>
                        </Col>
                      </Row>
                    ))}
                    <Button type="dashed" onClick={() => add()} block>
                      Thêm lịch học
                    </Button>
                  </>
                )}
              </Form.List>
            </Col>
          )}
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

export default ClassUpdate;