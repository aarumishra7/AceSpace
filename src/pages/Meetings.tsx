import React, { useState } from 'react';
import { Calendar, Clock, Users, Plus, Edit, Trash } from 'lucide-react';

const Meetings = () => {
  const [meetings, setMeetings] = useState([
    { id: 1, title: 'Group Study Session', date: '2023-04-15', time: '14:00', participants: 4 },
    { id: 2, title: 'Project Review', date: '2023-04-18', time: '10:00', participants: 3 },
  ]);

  const [newMeeting, setNewMeeting] = useState({ title: '', date: '', time: '', participants: '' });

  const addMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time) {
      setMeetings([...meetings, { id: Date.now(), ...newMeeting, participants: parseInt(newMeeting.participants) || 0 }]);
      setNewMeeting({ title: '', date: '', time: '', participants: '' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Meeting Planner</h1>
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Schedule New Meeting</h2>
        <input
          type="text"
          placeholder="Meeting Title"
          value={newMeeting.title}
          onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="date"
            value={newMeeting.date}
            onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="time"
            value={newMeeting.time}
            onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Number of Participants"
            value={newMeeting.participants}
            onChange={(e) => setNewMeeting({ ...newMeeting, participants: e.target.value })}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={addMeeting}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          <Plus className="h-5 w-5 inline-block mr-1" /> Schedule Meeting
        </button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Upcoming Meetings</h2>
        <ul className="space-y-4">
          {meetings.map((meeting) => (
            <li key={meeting.id} className="flex items-center justify-between border-b pb-2">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-500 mr-2" />
                <span className="font-medium">{meeting.title}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-green-500 mr-1" />
                <span className="text-sm text-gray-500 mr-4">{meeting.date} at {meeting.time}</span>
                <Users className="h-5 w-5 text-purple-500 mr-1" />
                <span className="text-sm text-gray-500 mr-4">{meeting.participants}</span>
                <button className="p-1 text-blue-500 hover:text-blue-600 transition duration-300">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="p-1 text-red-500 hover:text-red-600 transition duration-300">
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Meetings;