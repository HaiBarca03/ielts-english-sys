import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { updatePayment } from '../../stores/Payment/paymentAPI';


const PaymentUpdate = ({ show, onClose, paymentData, onSuccess }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        dispatch(updatePayment(paymentData.payment_id, values))
          .then(() => {
            message.success('Cập nhật thông tin thanh toán thành công!');
            onSuccess();
            onClose();
          })
          .catch(() => {
            message.error('Cập nhật thông tin thanh toán thất bại!');
          });
      })
      .catch((info) => {
        console.error('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title="Sửa Thông Tin Thanh Toán"
      visible={show}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" initialValues={paymentData}>
        <Form.Item
          name="studentName"
          label="Tên Học Viên"
          rules={[{ required: true, message: 'Vui lòng nhập tên học viên!' }]}
        >
          <Input placeholder="Nhập tên học viên" />
        </Form.Item>
        <Form.Item
          name="course"
          label="Khóa Học"
          rules={[{ required: true, message: 'Vui lòng nhập khóa học!' }]}
        >
          <Input placeholder="Nhập khóa học" />
        </Form.Item>
        <Form.Item
          name="paymentDate"
          label="Ngày Thanh Toán"
          rules={[{ required: true, message: 'Vui lòng nhập ngày thanh toán!' }]}
        >
          <Input placeholder="Nhập ngày thanh toán (DD/MM/YYYY)" />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Số Tiền"
          rules={[{ required: true, message: 'Vui lòng nhập số tiền!' }]}
        >
          <Input placeholder="Nhập số tiền" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PaymentUpdate;