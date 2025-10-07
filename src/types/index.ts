export interface DetectionResult {
  crop_name: string;
  quality: 'Good' | 'Bad';
  confidence: number;
  weight?: number;
}

export interface SortedCrop extends DetectionResult {
  sortPriority: number;
}

export interface DeliveryQueueItem {
  id: string;
  crop_name: string;
  destination: string;
  status: 'Pending' | 'In Transit' | 'Delivered';
  priority: number;
}

export interface RouteNode {
  id: string;
  name: string;
  x: number;
  y: number;
}

export interface RouteEdge {
  from: string;
  to: string;
  distance: number;
  isOptimal?: boolean;
}

export interface DashboardStats {
  totalCropsProcessed: number;
  averageConfidence: number;
  shortestRouteDistance: number;
}
