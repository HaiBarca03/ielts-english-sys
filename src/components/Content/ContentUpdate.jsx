import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { updateContent } from '../../stores/contents/contentAPI';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { Option } = Select;

const ContentUpdate = ({ show, onClose, content, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  useEffect(() => {
    if (show && content) {
      form.setFieldsValue({
        type: content.type,
        title: content.title,
        description: content.description,
        youtube_url: content.youtube_url,
        duration: content.duration,
      });

      const list = [];
      const urls = [];

      if (content.file_url) {
        list.push({
          uid: '-1',
          name: content.file_url.split('/').pop(),
          status: 'done',
          url: content.file_url,
          type: content.file_type || 'application/pdf',
        });
      }

      if (content.images && Array.isArray(content.images)) {
        content.images.forEach((img, index) => {
          list.push({
            uid: `img-${index}`,
            name: img.split('/').pop(),
            status: 'done',
            url: img,
            type: 'image/jpeg',
          });
        });
      }

      setFileList(list);
    }
  }, [show, content, form]);

  const handlePreview = async (file) => {
    if (!file.url && !file.originFileObj) return;

    try {
      let url = file.url;
      if (!url && file.originFileObj) {
        url = URL.createObjectURL(file.originFileObj);
        setPreviewUrls(prev => [...prev, url]);
      }
      
      if (url) {
        if (file.type?.startsWith('image/')) {
          window.open(url, '_blank');
        } else {

          window.open(url, '_blank');
        }
      }
    } catch (err) {
      toast.error('Failed to preview file');
      console.error('Preview error:', err);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      const user_id = localStorage.getItem('user_id') || '00000000-0000-0000-0000-000000000000';
      
      formData.append('user_id', user_id);
      formData.append('program_id', content.program_id);
      formData.append('type', values.type);
      formData.append('title', values.title);
      formData.append('description', values.description || '');
      formData.append('youtube_url', values.youtube_url || '');
      formData.append('duration', values.duration.toString());

      fileList.forEach((file) => {
        if (file.originFileObj) {
          if (file.type?.startsWith('image/')) {
            formData.append('images', file.originFileObj);
          } else {
            formData.append('file_url', file.originFileObj);
          }
        }
      });

      const response = await dispatch(updateContent(content.content_id, formData));

      if (response?.error) {
        throw new Error(response.payload || 'Cập nhật không thành công');
      }

      toast.success('Nội dung đã được cập nhật thành công!');
      onSuccess?.();
      onClose();
    } catch (err) {
      console.error('Update error:', err);
      const errorMessage = err.message || 'Đã xảy ra lỗi khi cập nhật!';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Cập Nhật Nội Dung Khóa Học"
      open={show}
      onCancel={onClose}
      onOk={() => form.submit()}
      confirmLoading={loading}
      okText="Cập nhật"
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
                'image/jpeg',
                'image/png',
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              ];
              const isValidType = allowedTypes.includes(file.type);
              if (!isValidType) {
                toast.error('Chỉ hỗ trợ ảnh (JPG, PNG), PDF, Word (.doc, .docx)');
                return Upload.LIST_IGNORE;
              }
              return false;
            }}
            fileList={fileList}
            onPreview={handlePreview}
            onChange={({ fileList: newFileList }) => setFileList(newFileList)}
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

export default ContentUpdate;