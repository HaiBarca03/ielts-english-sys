import React from 'react';
import { Modal } from 'antd';

const ContentView = ({ open, onClose, content }) => {
  if (!content) return null;

  return (
    <Modal
      title={content.title}
      open={open}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <p><strong>Mô tả:</strong> {content.description || 'Không có mô tả'}</p>
      <p><strong>Loại bài học:</strong> {content.type}</p>
      <p><strong>Thời lượng:</strong> {content.duration} phút</p>

      {content.file_url && (
        <p>
          <strong>Tài liệu:</strong>{' '}
          <a href={content.file_url} target="_blank" rel="noopener noreferrer">Tải về</a>
        </p>
      )}

      {content.youtube_url && (
        <div style={{ marginTop: '16px' }}>
          <strong>Video:</strong>
          <div style={{ marginTop: '8px' }}>
            <iframe
              width="100%"
              height="400px"
              src={content.youtube_url.replace("watch?v=", "embed/")}
              frameBorder="0"
              allowFullScreen
              title="Video bài học"
            ></iframe>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ContentView;
