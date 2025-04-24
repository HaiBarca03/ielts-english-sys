import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { createNewUser, getTeacherByRole} from '../../stores/users/userAPI';

const { Option } = Select;

const TeacherAdd = ({ show, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const TeacherData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: "Teacher",
        gender: values.gender,
        dob: values.dob ? moment(values.dob).format('YYYY-MM-DD') : null,
        address: values.address || '',
        school: values.school || '',
      };

      await dispatch(createNewUser(TeacherData));
      dispatch(getTeacherByRole())
      toast.success('Thêm giáo viên thành công!');
      form.resetFields();
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('Đã có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm Học Viên"
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
        initialValues={{ role: 'Student',password: '111111' }}
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
              name="role"
              label="Vai trò"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
            >
              <Select placeholder="Chọn vai trò">
                <Option value="Teacher">Giáo viên</Option>
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

export default TeacherAdd;