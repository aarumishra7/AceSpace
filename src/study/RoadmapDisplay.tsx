import React from 'react';
import { useStudyStore } from '../../store/studyStore';
import { Calendar, Clock, BookOpen, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const RoadmapDisplay: React.FC = () => {
  const { currentPlan, deletePlan } = useStudyStore();

  if (!currentPlan) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <BookOpen className="mr-2" />
          {currentPlan.subject} Study Plan
        </h2>
        <button
          onClick={() => deletePlan(currentPlan.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
        <span className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date(currentPlan.createdAt).toLocaleDateString()}
        </span>
        <span className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          {currentPlan.timeAvailable} hours
        </span>
      </div>

      <div className="prose max-w-none">
        <ReactMarkdown>{currentPlan.roadmap}</ReactMarkdown>
      </div>
    </div>
  );
};

export default RoadmapDisplay;