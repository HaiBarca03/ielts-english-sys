import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

import { loginUser } from '../../stores/users/userAPI';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      await dispatch(loginUser(values));
      const user =  JSON.parse(localStorage.getItem('user'));
      if (user.token) {
        toast.success('Đăng nhập thành công!');
        // Điều hướng dựa trên vai trò
        switch (user.role) {
          case 'Admin':
            navigate('/dashboard');
            break;
          case 'Teacher':
            navigate('/dashboard/teacher');
            break;
          case 'Student':
            navigate('/dashboard/student');
            break;
          default:
            navigate('/unauthorized');
        }
      } else {
        toast.error('Đăng nhập thất bại!');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Đăng nhập thất bại!';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container min-vh-100 d-flex justify-content-center align-items-center">
      {/* Logo */}
      <div className="position-absolute top-0 start-0 mt-3 ms-4 d-flex align-items-center gap-2">
        <Link to="/" className="text-decoration-none text-dark">
          <h5 className="m-0 fs-3 text text-white">EnglishCenter</h5>
        </Link>
      </div>

      {/* Login Box */}
      <div className="login-box shadow-lg p-5 rounded-3">
        <h2 className="text-center mb-4 text-white">Welcome Back!</h2>
        <p className="text-center text-white mb-4">
          Vui lòng đăng nhập tài khoản của bạn.
        </p>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          {/* Email Input */}
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Email"
              size="large"
              className="rounded-pill"
            />
          </Form.Item>

          {/* Password Input */}
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              { min: 6, message: 'Password must be at least 6 characters!' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              className="rounded-pill"
            />
          </Form.Item>

          {/* Remember Password & Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-white">Ghi nhớ mật khẩu</Checkbox>
            </Form.Item>
            <Link to="/forgot-password" className="text-decoration-none text-primary">
              Quên mật khẩu?
            </Link>
          </div>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              className="rounded-pill"
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
        <p className="text-center mt-3">
          <Link to="/" className="text-primary">
            Trang chủ
          </Link>
        </p>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Login;