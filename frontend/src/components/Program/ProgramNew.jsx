import React, { useState } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { createNewProgram, fetchPrograms } from "../../stores/programs/programAPI";

const ProgramNew = ({ show, onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await dispatch(createNewProgram(values));
      dispatch(fetchPrograms());
      message.success("Thêm khóa học thành công!");
      form.resetFields();
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm chương trình:", error);
      message.error("Đã xảy ra lỗi khi thêm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Thêm mới khóa học"
      open={show}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="brand_name"
          label="Tên khóa học"
          rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
        >
          <Input placeholder="Nhập tên khóa học" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea rows={4} placeholder="Nhập mô tả khóa học" />
        </Form.Item>

        <Form.Item>
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" loading={loading}>
              Thêm
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProgramNew;
