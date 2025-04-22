import React from 'react';
import { Card, List, Typography, Row, Col, Calendar, Badge } from 'antd';

const { Title, Text } = Typography;

const DashboardTeacherage = () => {
  const classes = [
    { id: 1, name: 'Lớp Tiếng Anh Cơ Bản', subject: 'Tiếng Anh', time: 'Thứ 2, 8:00 - 10:00' },
    { id: 2, name: 'Lớp Luyện Thi TOEIC', subject: 'TOEIC', time: 'Thứ 3, 10:00 - 12:00' },
    { id: 3, name: 'Lớp Giao Tiếp Nâng Cao', subject: 'Giao tiếp', time: 'Thứ 4, 14:00 - 16:00' },
  ];

  const notifications = [
    { id: 1, message: 'Hạn nộp điểm cuối kỳ là ngày 30/04/2025.' },
    { id: 2, message: 'Họp giáo viên vào ngày 25/04/2025 lúc 15:00.' },
    { id: 3, message: 'Cập nhật lịch dạy cho tháng 5.' },
  ];

  const getListData = (value) => {
    const date = value.date();
    if (date === 25) {
      return [{ type: 'warning', content: 'Họp giáo viên lúc 15:00.' }];
    }
    if (date === 30) {
      return [{ type: 'success', content: 'Hạn nộp điểm cuối kỳ.' }];
    }
    return [];
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <Row gutter={[16, 16]}>
        {/* Danh sách lớp đang dạy */}
        <Col span={12}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Danh sách lớp đang dạy</Title>}
            bordered={false}
            style={{ borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
          >
            <List
              dataSource={classes}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={<Text strong style={{ fontSize: '16px' }}>{item.name}</Text>}
                    description={
                      <>
                        <Text style={{ color: '#555' }}>Môn học: {item.subject}</Text>
                        <br />
                        <Text style={{ color: '#555' }}>Thời gian: {item.time}</Text>
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        {/* Thông báo */}
        <Col span={12}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Thông báo</Title>}
            bordered={false}
            style={{ borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
          >
            <List
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item>
                  <Text style={{ color: '#555' }}>{item.message}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
        {/* Lịch dạy */}
        <Col span={24}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Lịch dạy</Title>}
            bordered={false}
            style={{ borderRadius: '10px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
          >
            <Calendar dateCellRender={dateCellRender} fullscreen={false} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardTeacherage;
