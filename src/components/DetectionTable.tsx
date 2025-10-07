import { CheckCircle2, XCircle } from 'lucide-react';
import { DetectionResult } from '../types';

interface DetectionTableProps {
  results: DetectionResult[];
}

export default function DetectionTable({ results }: DetectionTableProps) {
  if (results.length === 0) {
    return null;
  }

  return (
    <section id="detection" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Detected Crops</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-green-600 to-green-500 text-white">
              <th className="py-3 px-4 text-left font-semibold">Crop Name</th>
              <th className="py-3 px-4 text-left font-semibold">Quality</th>
              <th className="py-3 px-4 text-left font-semibold">Confidence</th>
              <th className="py-3 px-4 text-left font-semibold">Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr
                key={index}
                className={`border-b hover:bg-gray-50 transition-colors duration-150 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="py-3 px-4 font-medium text-gray-800">{result.crop_name}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      result.quality === 'Good'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {result.quality === 'Good' ? (
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                    ) : (
                      <XCircle className="w-4 h-4 mr-1" />
                    )}
                    {result.quality}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-green-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${result.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {(result.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">{result.weight || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
