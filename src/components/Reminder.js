import React from 'react';

import { addMinutes, getDateHourMinutes } from '../helpers/hours';

const Reminder = ({ reminder, onUpdate }) => {
  const endTime = addMinutes(reminder.startTime, reminder.duration);

  return (
    <div className="reminder" style={{ background: reminder.color }} onClick={() => onUpdate()}>
      <span className="reminder__time">
        {getDateHourMinutes(reminder.startTime)} - {getDateHourMinutes(endTime)}
      </span>
      <span>{reminder.description}</span>
    </div>
  );
};

export default Reminder;
