import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { updateUser, getStudentByRole } from '../../stores/users/userAPI';

const { Option } = Select;

const UserUpdate = ({ show, onClose, userData, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set form values when userData changes
  useEffect(() => {
    if (userData) {
      form.setFieldsValue({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: userData.role,
        gender: userData.gender,
        dob: userData.dob ? moment(userData.dob) : null,
        address: userData.address || '',
        school: userData.school || '',
      });
    }
  }, [userData, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const updatedData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: values.role,
        gender: values.gender,
        dob: values.dob ? moment(values.dob).format('YYYY-MM-DD') : null,
        address: values.address || '',
        school: values.school || '',
      };

      await dispatch(updateUser(userData.user_id, updatedData));
      dispatch(getStudentByRole());
      toast.success('Cập nhật thành công!');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Đã có lỗi xảy ra khi cập nhật!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập Nhật Học Viên"
      open={show}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Cập nhật"
      cancelText="Hủy"
      width={800}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Row gutter={16}>
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
                  message: 'Số điện thoại phải có 10 hoặc 11 chữ số',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
            >
              <Select placeholder="Chọn vai trò">
                <Option value="Student">Học viên</Option>
                <Option value="Admin">Quản trị viên</Option>
              </Select>
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
                format="YYYY-MM-DD"
                style={{ width: '100%' }}
                disabledDate={(current) => current && current > moment().endOf('day')}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
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

export default UserUpdate;