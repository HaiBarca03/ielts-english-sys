import React from 'react';
import { Card, List, Typography, Row, Col, Calendar, Badge } from 'antd';

const { Title, Text } = Typography;

const DarshboardStudent = () => {
  const classes = [
    { id: 1, name: 'English Beginner', teacher: 'Mr. John Doe', time: 'Monday, 8:00 - 10:00' },
    { id: 2, name: 'English Intermediate', teacher: 'Ms. Jane Smith', time: 'Tuesday, 10:00 - 12:00' },
    { id: 3, name: 'English Advanced', teacher: 'Mr. Michael Brown', time: 'Wednesday, 14:00 - 16:00' },
  ];

  const notifications = [
    { id: 1, message: 'Submit your English Beginner assignment by April 30, 2025.' },
    { id: 2, message: 'Midterm exam scheduled for April 25, 2025.' },
    { id: 3, message: 'Updated class schedule for May is now available.' },
  ];

  const getListData = (value) => {
    const date = value.date();
    if (date === 25) {
      return [{ type: 'warning', content: 'Midterm exam at 8:00 AM.' }];
    }
    if (date === 30) {
      return [{ type: 'success', content: 'Assignment submission deadline.' }];
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
        {/* Danh sách lớp học */}
        <Col span={12}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Your Classes</Title>}
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
                        <Text style={{ color: '#555' }}>Teacher: {item.teacher}</Text>
                        <br />
                        <Text style={{ color: '#555' }}>Time: {item.time}</Text>
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
            title={<Title level={4} style={{ margin: 0 }}>Notifications</Title>}
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
        {/* Lịch học */}
        <Col span={24}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Class Schedule</Title>}
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

export default DarshboardStudent;