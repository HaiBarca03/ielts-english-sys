import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { createNewUser, getStudentByRole } from '../../stores/users/userAPI';
import { addUserToClass } from '../../stores/classes/classAPI';

const { Option } = Select;

const StudentAdd = ({ show, onClose, onSuccess, className, classId }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const studentData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: 'Student',
        gender: values.gender,
        dob: values.dob ? moment(values.dob).format('YYYY-MM-DD') : null,
        address: values.address || '',
        school: values.school || '',
      };
  
  
      const response = await dispatch(createNewUser(studentData));

      const newUserId = response.user.user_id;
  
      if (classId) {
        await dispatch(addUserToClass(classId, newUserId));
        toast.success(`Thêm học viên vào lớp thành công!`);
      } else {
        toast.success('Thêm học viên thành công!');
      }
  
      dispatch(getStudentByRole());
      form.resetFields();
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Error:', err);
      toast.error(err.message || 'Đã có lỗi xảy ra khi thêm học viên!');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Modal
      title={`Thêm Học Viên Mới ${className ? `vào lớp ${className}` : ''}`}
      open={show}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Tạo mới"
      cancelText="Hủy"
      width={800}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{ password: '111111' }}
      >
        <Row gutter={16}>
          {className && (
            <Col span={24}>
              <Form.Item label="Lớp học">
                <Input value={className} disabled />
              </Form.Item>
            </Col>
          )}

          <Col span={12}>
            <Form.Item
              name="name"
              label="Họ và tên"
              rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại' },
                {
                  pattern: /^[0-9]{10,11}$/,
                  message: 'Số điện thoại phải có 10-11 chữ số',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[
                { required: true, message: 'Vui lòng nhập mật khẩu' },
                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
            >
              <Select placeholder="Chọn giới tính">
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
                <Option value="Khác">Khác</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="dob"
              label="Ngày sinh"
              rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
            >
              <DatePicker
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
                disabledDate={(current) => current && current > moment().endOf('day')}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="address" label="Địa chỉ">
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item name="school" label="Trường học">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default StudentAdd;