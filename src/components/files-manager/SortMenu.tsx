import React from 'react';
import { Check } from 'lucide-react';

interface SortMenuProps {
  currentSort: string;
  onSort: (type: string) => void;
  onClose: () => void;
}

const SortMenu: React.FC<SortMenuProps> = ({ currentSort, onSort, onClose }) => {
  const sortOptions = [
    { id: 'name-asc', label: 'Name (A to Z)' },
    { id: 'name-desc', label: 'Name (Z to A)' },
    { id: 'size-asc', label: 'Size (Smallest first)' },
    { id: 'size-desc', label: 'Size (Largest first)' },
    { id: 'date-asc', label: 'Date (Oldest first)' },
    { id: 'date-desc', label: 'Date (Newest first)' },
    { id: 'visits-desc', label: 'Most visited' },
  ];

  return (
    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg z-10">
      <div className="py-2">
        {sortOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onSort(option.id)}
            className="w-full px-4 py-2 text-left flex items-center hover:bg-gray-100"
          >
            <span className="flex-grow">{option.label}</span>
            {currentSort === option.id && (
              <Check className="w-4 h-4 text-blue-500" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortMenu;