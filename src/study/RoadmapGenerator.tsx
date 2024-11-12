import React, { useState } from 'react';
import { useStudyStore } from '../../store/studyStore';
import { Book, Clock, BarChart } from 'lucide-react';

const RoadmapGenerator: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [timeAvailable, setTimeAvailable] = useState('');
  const [difficulty, setDifficulty] = useState('beginner');

  const { generatePlan, loading, error } = useStudyStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (subject && timeAvailable) {
      await generatePlan(subject, parseInt(timeAvailable), difficulty);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Book className="mr-2" /> Generate Study Roadmap
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Mathematics, Physics, History"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline mr-1" /> Available Time (hours)
          </label>
          <input
            type="number"
            value={timeAvailable}
            onChange={(e) => setTimeAvailable(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <BarChart className="inline mr-1" /> Current Level
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Generating...
            </>
          ) : (
            'Generate Roadmap'
          )}
        </button>
      </form>
    </div>
  );
};

export default RoadmapGenerator;