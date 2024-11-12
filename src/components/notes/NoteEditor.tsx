import React, { useState } from 'react';
import { Bold, Italic, Underline, List, Image, Link as LinkIcon, Type, Palette, Save, Heading1, Heading2, Heading3 } from 'lucide-react';

const NoteEditor = ({ note, onUpdate, onClose }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);

  const colors = [
    '#ffffff', '#f8d7da', '#d4edda', '#cce5ff', '#fff3cd',
    '#d1ecf1', '#e2e3e5', '#f8f9fa', '#343a40'
  ];

  const fonts = [
    { name: 'Default', value: 'ui-sans-serif, system-ui, -apple-system' },
    { name: 'Serif', value: 'ui-serif, Georgia' },
    { name: 'Mono', value: 'ui-monospace, monospace' },
  ];

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const handleHeading = (level) => {
    formatText('formatBlock', `h${level}`);
  };

  const handleColorChange = (color) => {
    formatText('backColor', color);
    setShowColorPicker(false);
  };

  const handleFontChange = (fontFamily) => {
    formatText('fontName', fontFamily);
    setShowFontPicker(false);
  };

  const handleTitleChange = (e) => {
    onUpdate(note.id, { title: e.target.value });
  };

  const handleContentChange = (e) => {
    onUpdate(note.id, { content: e.currentTarget.innerHTML });
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <input
        type="text"
        value={note.title}
        onChange={handleTitleChange}
        className="w-full text-3xl font-bold mb-6 p-2 border-b focus:outline-none focus:border-blue-500"
        placeholder="Note Title"
      />

      <div className="sticky top-0 z-10 bg-white border-b mb-4">
        <div className="flex flex-wrap items-center gap-2 py-2">
          <button onClick={() => formatText('bold')} className="p-2 hover:bg-gray-100 rounded">
            <Bold size={20} />
          </button>
          <button onClick={() => formatText('italic')} className="p-2 hover:bg-gray-100 rounded">
            <Italic size={20} />
          </button>
          <button onClick={() => formatText('underline')} className="p-2 hover:bg-gray-100 rounded">
            <Underline size={20} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <button onClick={() => handleHeading(1)} className="p-2 hover:bg-gray-100 rounded">
            <Heading1 size={20} />
          </button>
          <button onClick={() => handleHeading(2)} className="p-2 hover:bg-gray-100 rounded">
            <Heading2 size={20} />
          </button>
          <button onClick={() => handleHeading(3)} className="p-2 hover:bg-gray-100 rounded">
            <Heading3 size={20} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <button onClick={() => formatText('insertUnorderedList')} className="p-2 hover:bg-gray-100 rounded">
            <List size={20} />
          </button>
          <button onClick={() => formatText('insertImage')} className="p-2 hover:bg-gray-100 rounded">
            <Image size={20} />
          </button>
          <button onClick={() => formatText('createLink')} className="p-2 hover:bg-gray-100 rounded">
            <LinkIcon size={20} />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <div className="relative">
            <button
              onClick={() => setShowFontPicker(!showFontPicker)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Type size={20} />
            </button>
            {showFontPicker && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-20">
                {fonts.map((font) => (
                  <button
                    key={font.name}
                    onClick={() => handleFontChange(font.value)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <Palette size={20} />
            </button>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-20">
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorChange(color)}
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className="min-h-[500px] prose max-w-none focus:outline-none"
        contentEditable
        dangerouslySetInnerHTML={{ __html: note.content }}
        onInput={handleContentChange}
        style={{
          backgroundColor: note.color,
          fontFamily: note.fontFamily,
        }}
      />

      <button
        onClick={() => onUpdate(note.id, { lastModified: new Date() })}
        className="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors flex items-center"
      >
        <Save size={20} className="mr-2" />
        Save
      </button>
    </div>
  );
};

export default NoteEditor;