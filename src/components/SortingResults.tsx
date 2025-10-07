import { ArrowUpDown, Trophy } from 'lucide-react';
import { SortedCrop } from '../types';

interface SortingResultsProps {
  sortedCrops: SortedCrop[];
}

export default function SortingResults({ sortedCrops }: SortingResultsProps) {
  if (sortedCrops.length === 0) {
    return null;
  }

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
      <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
        <ArrowUpDown className="w-6 h-6 mr-2" />
        Sorting Results
      </h2>

      <div className="bg-gradient-to-r from-yellow-50 to-green-50 border-l-4 border-green-600 p-4 mb-6 rounded">
        <p className="text-gray-700 font-medium flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
          Sorted by: <span className="text-green-700 font-bold ml-2">Quality and Weight</span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          High-quality crops are prioritized for premium markets
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCrops.map((crop, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transform hover:scale-105 transition-all duration-200 ${
              crop.quality === 'Good'
                ? 'bg-green-50 border-green-300 hover:border-green-500'
                : 'bg-red-50 border-red-300 hover:border-red-500'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-800">{crop.crop_name}</h3>
              <span className="text-xs font-semibold px-2 py-1 bg-gray-200 rounded">
                #{index + 1}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Quality:</span>
                <span
                  className={`font-semibold ${
                    crop.quality === 'Good' ? 'text-green-700' : 'text-red-700'
                  }`}
                >
                  {crop.quality}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Confidence:</span>
                <span className="font-semibold text-gray-800">
                  {(crop.confidence * 100).toFixed(1)}%
                </span>
              </div>
              {crop.weight && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-semibold text-gray-800">{crop.weight} kg</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
