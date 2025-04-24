import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/vi'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './ScheduleCalendar.css';

moment.locale('vi'); // Set moment to Vietnamese

const localizer = momentLocalizer(moment);

const ScheduleCalendar = ({ events, onSelectEvent }) => {
  const eventStyleGetter = (event) => {
    let backgroundColor = '#52c41a'; // Default green
    let borderColor = '#389e0d';

    if (event.type.includes('t')) {
      backgroundColor = '#1890ff'; // Blue for teacher
      borderColor = '#096dd9';
    }
    if (event.type.includes('c')) {
      backgroundColor = '#722ed1'; // Purple for class
      borderColor = '#531dab';
    }

    return {
      style: {
        backgroundColor,
        color: 'white',
        borderRadius: '6px',
        border: `2px solid ${borderColor}`,
        padding: '4px 8px',
        fontSize: '0.9em',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.2s',
      },
    };
  };

  return (
    <div className="enhanced-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '75vh' }}
        views={['month', 'week', 'day']}
        defaultView="week"
        eventPropGetter={eventStyleGetter}
        onSelectEvent={onSelectEvent}
        messages={{
          today: 'Hôm nay',
          previous: 'Trước',
          next: 'Sau',
          month: 'Tháng',
          week: 'Tuần',
          day: 'Ngày',
          noEventsInRange: 'Không có lịch học trong khoảng thời gian này',
        }}
        components={{
          event: ({ event }) => (
            <div className="custom-event">
              <div className="event-title">{event.title}</div>
              <div className="event-time">
                {moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}
              </div>
              <div className="event-room">{event.resource}</div>
            </div>
          ),
        }}
      />
    </div>
  );
};

export default ScheduleCalendar;