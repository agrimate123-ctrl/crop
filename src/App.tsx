import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ImageUpload from './components/ImageUpload';
import DetectionTable from './components/DetectionTable';
import SortingResults from './components/SortingResults';
import DeliveryQueue from './components/DeliveryQueue';
import RouteVisualization from './components/RouteVisualization';
import DashboardSummary from './components/DashboardSummary';
import {
  generateMockDetection,
  generateMockSorting,
  generateMockDeliveryQueue,
  generateMockRoute,
} from './services/api';
import { DetectionResult, SortedCrop, DeliveryQueueItem, RouteNode, RouteEdge, DashboardStats } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);
  const [sortedCrops, setSortedCrops] = useState<SortedCrop[]>([]);
  const [deliveryQueue, setDeliveryQueue] = useState<DeliveryQueueItem[]>([]);
  const [routeNodes, setRouteNodes] = useState<RouteNode[]>([]);
  const [routeEdges, setRouteEdges] = useState<RouteEdge[]>([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalCropsProcessed: 0,
    averageConfidence: 0,
    shortestRouteDistance: 0,
  });

  const handleDetection = async (file: File) => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const mockResults = generateMockDetection(file.name);
      setDetectionResults(mockResults);

      const sorted = generateMockSorting(mockResults);
      setSortedCrops(sorted);

      const queue = generateMockDeliveryQueue(sorted);
      setDeliveryQueue(queue);

      const route = generateMockRoute();
      setRouteNodes(route.nodes);
      setRouteEdges(route.edges);
      setTotalDistance(route.distance);

      const avgConfidence =
        mockResults.reduce((sum, r) => sum + r.confidence, 0) / mockResults.length;

      setDashboardStats({
        totalCropsProcessed: mockResults.length,
        averageConfidence: avgConfidence,
        shortestRouteDistance: route.distance,
      });
    } catch (error) {
      console.error('Detection failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <DashboardSummary stats={dashboardStats} />

        <div className="mt-8 space-y-8">
          <ImageUpload onDetect={handleDetection} isLoading={isLoading} />

          <DetectionTable results={detectionResults} />

          <SortingResults sortedCrops={sortedCrops} />

          <DeliveryQueue queue={deliveryQueue} />

          <RouteVisualization
            nodes={routeNodes}
            edges={routeEdges}
            totalDistance={totalDistance}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
