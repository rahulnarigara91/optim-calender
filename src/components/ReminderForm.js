import React, { Component } from 'react';
import { TwitterPicker } from 'react-color';

import { Reminder } from '../lib/Reminder';
import { getDateHourMinutes, formatDateFromTime } from '../helpers/hours';

class ReminderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      description: (props.reminder && props.reminder.description) || '',
      color: (props.reminder && props.reminder.color) || '#86EEA8',
      startTime: (props.reminder && props.reminder.startTime) || getDateHourMinutes(new Date()),
      duration: (props.reminder && props.reminder.endTime) || 30,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { weekIndex, dayIndex, reminder } = this.props;

    if (reminder) {
      const updatedReminder = Object.assign(reminder, {
        ...this.state,
        startTime: formatDateFromTime(this.props.day.date, this.state.startTime),
      });
      this.props.onUpdate({
        weekIndex,
        dayIndex,
        reminder: updatedReminder,
      });
    } else {
      this.props.onCreate({
        weekIndex,
        dayIndex,
        reminder: new Reminder({
          ...this.state,
          startTime: formatDateFromTime(this.props.day.date, this.state.startTime),
        }),
      });
    }
    this.props.onComplete();
  };

  handleDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };

  handleColorChange = color => {
    this.setState({ color });
  };

  handleStartTimeChange = e => {
    this.setState({
      startTime: e.target.value,
    });
  };

  handleDurationChange = e => {
    this.setState({
      duration: e.target.value,
    });
  };

  render() {
    return (
      <form className="reminder__form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          maxLength={20}
          autoFocus={true}
          placeholder="New reminder description"
          value={this.state.description}
          required={true}
          onChange={this.handleDescriptionChange}
        />
        <br />
        <label>Color:</label>
        <TwitterPicker color={this.state.color} onChangeComplete={this.handleColorChange} />
        <label>Start Time:</label>
        <input
          type="time"
          step={5}
          value={this.state.startTime}
          onChange={this.handleStartTimeChange}
        />
        <label>Duration:</label>
        <input
          type="number"
          step={5}
          value={this.state.duration}
          onChange={this.handleDurationChange}
        />
        mins
        <br />
        <br />
        <button type="submit">{this.props.reminder ? 'Update' : 'Create'}</button>
        {this.props.reminder && (
          <span
            onClick={e => {
              e.preventDefault();
              if (window.confirm('You want to delete this reminder?')) {
                this.props.onDelete({
                  weekIndex: this.props.weekIndex,
                  dayIndex: this.props.dayIndex,
                  reminder: this.props.reminder,
                });
                this.props.onComplete();
              }
            }}
            className="reminder__form__delete"
          >
            Delete
          </span>
        )}
      </form>
    );
  }
}

export default ReminderForm;
