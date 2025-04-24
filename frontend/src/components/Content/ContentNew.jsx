import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewContent } from '../../stores/contents/contentAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const ContentNew = ({ show, onClose, onSuccess }) => {
  const { programId } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const user_id = localStorage.getItem('user_id') || '00000000-0000-0000-0000-000000000000';
      formData.append('user_id', user_id);
      formData.append('program_id', programId);
      formData.append('type', values.type);
      formData.append('title', values.title);
      formData.append('description', values.description || '');
      formData.append('youtube_url', values.youtube_url || '');
      formData.append('duration', values.duration);

      fileList.forEach((file) => {
        const isImage = file.type.startsWith('/');
        if (isImage) {
          formData.append('images', file.originFileObj);
        } else {
          formData.append('file_url', file.originFileObj);
        }
      });
      console.log(formData)
      await dispatch(createNewContent(formData));
      toast.success('Thêm nội dung thành công!');
      form.resetFields();
      setFileList([]);
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
      title="Thêm Nội Dung Khóa Học"
      open={show}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Tạo mới"
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="type"
          label="Loại nội dung"
          rules={[{ required: true, message: 'Vui lòng chọn loại nội dung' }]}
        >
          <Select placeholder="Chọn loại">
            <Option value="Lesson">Lesson</Option>
            <Option value="Practice">Practice</Option>
            <Option value="Test">Test</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="title"
          label="Tiêu đề"
          rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item name="youtube_url" label="Link YouTube">
          <Input placeholder="Dán link YouTube nếu có" />
        </Form.Item>

        <Form.Item
          name="duration"
          label="Thời lượng (phút)"
          rules={[{ required: true, message: 'Vui lòng nhập thời lượng' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Upload file hoặc ảnh"
          rules={[
            {
              validator: () => {
                if (fileList.length === 0) {
                  return Promise.reject('Vui lòng upload ít nhất một file hoặc ảnh!');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Upload
            multiple
            beforeUpload={(file) => {
              const allowedTypes = [
                'image/',
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ];
              const isValidType = allowedTypes.some((type) => file.type.startsWith(type) || file.type === type);
              if (!isValidType) {
                toast.error('Chỉ hỗ trợ ảnh, PDF, Word (.doc, .docx)');
                return Upload.LIST_IGNORE;
              }
              return false; 
            }}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            listType="picture"
            showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
          >
           <Button icon={<UploadOutlined />}>Chọn file/ảnh</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContentNew;