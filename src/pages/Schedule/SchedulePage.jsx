import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './SchedulePage.css';

const localizer = momentLocalizer(moment);

const SchedulePage = () => {
  const [events, setEvents] = useState([
    {
      title: 'Tiếng Anh - Lan Linh',
      start: new Date(2025, 3, 20, 8, 0), // Ngày 20/4/2025, 08:00
      end: new Date(2025, 3, 20, 9, 30), // Ngày 20/4/2025, 09:30
      resource: 'Phòng 201',
    },
    {
      title: 'Tiếng Anh - Hoa Mai',
      start: new Date(2025, 3, 20, 10, 0),
      end: new Date(2025, 3, 20, 11, 30),
      resource: 'Phòng 202',
    },
    {
      title: 'Tiếng Anh - Lan Linh',
      start: new Date(2025, 3, 21, 13, 0),
      end: new Date(2025, 3, 21, 14, 30),
      resource: 'Phòng 203',
    },
    {
      title: 'Tiếng Anh - Hoa Mai',
      start: new Date(2025, 3, 22, 8, 0),
      end: new Date(2025, 3, 22, 9, 30),
      resource: 'Phòng 204',
    },
  ]);

  return (
    <div className="schedule-container">
      <h2 className="schedule-title">Thời Khóa Biểu</h2>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          popup
          eventPropGetter={(event) => ({
            style: {
              backgroundColor: '#52c41a',
              color: 'white',
              borderRadius: '5px',
              padding: '5px',
            },
          })}
          onSelectEvent={(event) => alert(`Chi tiết: ${event.title}, ${event.resource}`)}
          onSelectSlot={(slotInfo) =>
            alert(`Chọn khoảng thời gian: ${moment(slotInfo.start).format('YYYY-MM-DD HH:mm')}`)
          }
        />
      </div>
    </div>
  );
};

export default SchedulePage;