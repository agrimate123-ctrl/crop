import { BarChart3, Target, Route } from 'lucide-react';
import { DashboardStats } from '../types';

interface DashboardSummaryProps {
  stats: DashboardStats;
}

export default function DashboardSummary({ stats }: DashboardSummaryProps) {
  if (stats.totalCropsProcessed === 0) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium mb-1">Total Crops Processed</p>
            <p className="text-4xl font-bold">{stats.totalCropsProcessed}</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <BarChart3 className="w-8 h-8" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-green-400">
          <p className="text-sm text-green-100">
            Successfully detected and sorted
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-100 text-sm font-medium mb-1">Average Confidence</p>
            <p className="text-4xl font-bold">{(stats.averageConfidence * 100).toFixed(1)}%</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Target className="w-8 h-8" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-yellow-400">
          <div className="w-full bg-yellow-700 bg-opacity-30 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.averageConfidence * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium mb-1">Shortest Route</p>
            <p className="text-4xl font-bold">{stats.shortestRouteDistance} km</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <Route className="w-8 h-8" />
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-blue-400">
          <p className="text-sm text-blue-100">
            Optimized using Dijkstra's algorithm
          </p>
        </div>
      </div>
    </section>
  );
}
