import React, { useState } from 'react';
import { Wand2, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useNoteStore } from '../../store/noteStore';

const AIContentGenerator: React.FC = () => {
  const { generateAIContent, loading, error } = useNoteStore();
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const contentTypes = [
    { id: 'outline', label: 'Create Outline', prompt: 'Create a detailed outline for: ' },
    { id: 'expand', label: 'Expand Text', prompt: 'Expand and elaborate on this text: ' },
    { id: 'summarize', label: 'Summarize', prompt: 'Provide a concise summary of: ' },
    { id: 'improve', label: 'Improve Writing', prompt: 'Improve the writing style of: ' },
  ];

  const handleGenerate = async (type: string) => {
    if (!prompt) return;

    setStatus('loading');
    try {
      const selectedType = contentTypes.find(t => t.id === type);
      const fullPrompt = `${selectedType?.prompt}${prompt}`;
      const content = await generateAIContent(fullPrompt);
      setGeneratedContent(content);
      setStatus('success');
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Wand2 className="text-blue-500 mr-2" size={24} />
        <h2 className="text-xl font-semibold">AI Content Generator</h2>
      </div>

      <div className="mb-6">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your text or describe what you want to create..."
          className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleGenerate(type.id)}
            disabled={loading || !prompt}
            className={`p-3 rounded-lg flex items-center justify-center transition-colors ${
              loading
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            {loading ? (
              <Loader2 className="animate-spin mr-2" size={18} />
            ) : (
              <Wand2 className="mr-2" size={18} />
            )}
            {type.label}
          </button>
        ))}
      </div>

      {status !== 'idle' && (
        <div className={`p-4 rounded-lg ${
          status === 'loading' ? 'bg-blue-50' :
          status === 'success' ? 'bg-green-50' :
          status === 'error' ? 'bg-red-50' : ''
        }`}>
          {status === 'loading' && (
            <div className="flex items-center text-blue-600">
              <Loader2 className="animate-spin mr-2" size={18} />
              Generating content...
            </div>
          )}
          {status === 'success' && (
            <div>
              <div className="flex items-center text-green-600 mb-2">
                <CheckCircle className="mr-2" size={18} />
                Content generated successfully!
              </div>
              <div className="prose max-w-none">
                {generatedContent}
              </div>
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center text-red-600">
              <XCircle className="mr-2" size={18} />
              {error || 'Failed to generate content. Please try again.'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIContentGenerator;