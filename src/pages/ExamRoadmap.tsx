import React from 'react';
import RoadmapGenerator from '../components/study/RoadmapGenerator';
import RoadmapDisplay from '../components/study/RoadmapDisplay';
import { useStudyStore } from '../store/studyStore';
import { Book } from 'lucide-react';

const ExamRoadmap = () => {
  const { plans } = useStudyStore();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <Book className="mr-2" />
        AI Study Roadmap Generator
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <RoadmapGenerator />
          
          {plans.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">Previous Roadmaps</h2>
              <div className="space-y-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-50"
                    onClick={() => useStudyStore.getState().setCurrentPlan(plan)}
                  >
                    <h3 className="font-medium">{plan.subject}</h3>
                    <div className="text-sm text-gray-600">
                      Created on {new Date(plan.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <RoadmapDisplay />
        </div>
      </div>
    </div>
  );
};

export default ExamRoadmap;