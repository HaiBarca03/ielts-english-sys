import React, { useState, useEffect } from 'react';
import { message, Spin, Alert, Card, Typography } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSchedules } from '../../stores/Schedules/schedulesAPI';
import ScheduleCalendar from '../../components/Schedule/ScheduleCalendar';
import './SchedulePage.css';

const { Title, Text } = Typography;

const SchedulePage = () => {
  const dispatch = useDispatch();
  const { schedulesList, loading, error } = useSelector(state => state.schedule);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  useEffect(() => {
    if (schedulesList?.items) {
      try {
        const formattedEvents = schedulesList.items.map(schedule => ({
          id: schedule.schedule_id,
          title: `${schedule.Class?.name || 'N/A'} - ${schedule.Teacher?.name || 'N/A'}`,
          start: new Date(`${schedule.date}T${schedule.start_time}`),
          end: new Date(`${schedule.date}T${schedule.end_time}`),
          resource: schedule.room || 'N/A',
          class: schedule.Class || {},
          teacher: schedule.Teacher || {},
          type: schedule.type || 'regular',
        }));
        setEvents(formattedEvents);
      } catch (e) {
        console.error('Error formatting events:', e);
        message.error('Failed to process schedule data');
      }
    }
  }, [schedulesList]);

  const handleSelectEvent = (event) => {
    message.info({
      content: (
        <div className="event-detail">
          <div className="event-header">
            <span className="event-type" style={{ 
              backgroundColor: event.type.includes('t') ? '#1890ff' : '#722ed1'
            }}>
              {event.type.includes('t') ? 'Giáo viên' : 'Lớp học'}
            </span>
            <h3>{event.class?.name || 'N/A'}</h3>
          </div>
          <div className="event-body">
            <p><Text strong>Giáo viên:</Text> {event.teacher?.name || 'N/A'}</p>
            <p><Text strong>Phòng:</Text> {event.resource}</p>
            <p><Text strong>Thời gian:</Text> {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}</p>
            <p><Text strong>Ngày:</Text> {moment(event.start).format('DD/MM/YYYY')}</p>
          </div>
        </div>
      ),
      duration: 6,
      className: 'custom-message',
    });
  };

  if (loading) return (
    <div className="loading-container">
      <Spin tip="Đang tải thời khóa biểu..." size="large" />
    </div>
  );

  if (error) return (
    <Alert 
      message="Lỗi tải dữ liệu" 
      description={error} 
      type="error" 
      showIcon 
      className="error-alert"
    />
  );

  return (
    <div className="schedule-page">
      <Card className="schedule-card">
        <div className="schedule-header">
          <Title level={3} className="schedule-title">
            Thời Khóa Biểu
          </Title>
          <Text type="secondary" className="schedule-meta">
            Trang {schedulesList?.currentPage || 1}/{schedulesList?.totalPages || 1} • 
            Tổng {schedulesList?.totalItems || 0} buổi học
          </Text>
        </div>
        
        <ScheduleCalendar 
          events={events} 
          onSelectEvent={handleSelectEvent}
        />
      </Card>
    </div>
  );
};

export default SchedulePage;