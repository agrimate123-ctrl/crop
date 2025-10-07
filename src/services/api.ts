import { DetectionResult, SortedCrop, DeliveryQueueItem, RouteNode, RouteEdge } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const cropAPI = {
  detectCrops: async (imageFile: File): Promise<DetectionResult[]> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${API_BASE_URL}/detect`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Detection failed');
    }

    return response.json();
  },

  sortCrops: async (crops: DetectionResult[]): Promise<SortedCrop[]> => {
    const response = await fetch(`${API_BASE_URL}/sort`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ crops }),
    });

    if (!response.ok) {
      throw new Error('Sorting failed');
    }

    return response.json();
  },

  getDeliveryRoute: async (crops: SortedCrop[]): Promise<{
    nodes: RouteNode[];
    edges: RouteEdge[];
    distance: number;
  }> => {
    const response = await fetch(`${API_BASE_URL}/route`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ crops }),
    });

    if (!response.ok) {
      throw new Error('Route calculation failed');
    }

    return response.json();
  },
};

export const generateMockDetection = (imageName: string): DetectionResult[] => {
  const crops = ['Tomato', 'Potato', 'Carrot', 'Onion', 'Cabbage', 'Wheat', 'Rice'];
  const numCrops = Math.floor(Math.random() * 4) + 2;

  return Array.from({ length: numCrops }, (_, i) => ({
    crop_name: crops[Math.floor(Math.random() * crops.length)],
    quality: Math.random() > 0.3 ? 'Good' : 'Bad',
    confidence: Math.random() * 0.3 + 0.7,
    weight: Math.floor(Math.random() * 50) + 10,
  }));
};

export const generateMockSorting = (crops: DetectionResult[]): SortedCrop[] => {
  return crops
    .map((crop, index) => ({
      ...crop,
      sortPriority: crop.quality === 'Good' ? index : index + 100,
    }))
    .sort((a, b) => a.sortPriority - b.sortPriority);
};

export const generateMockDeliveryQueue = (sortedCrops: SortedCrop[]): DeliveryQueueItem[] => {
  const destinations = ['City Market', 'Warehouse A', 'Distribution Center', 'Export Hub', 'Local Store'];
  const statuses: Array<'Pending' | 'In Transit' | 'Delivered'> = ['Pending', 'In Transit', 'Delivered'];

  return sortedCrops.map((crop, index) => ({
    id: `delivery-${index}`,
    crop_name: crop.crop_name,
    destination: destinations[index % destinations.length],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    priority: crop.sortPriority,
  }));
};

export const generateMockRoute = (): {
  nodes: RouteNode[];
  edges: RouteEdge[];
  distance: number;
} => {
  const nodes: RouteNode[] = [
    { id: 'farm', name: 'Farm', x: 50, y: 50 },
    { id: 'market1', name: 'City Market', x: 200, y: 100 },
    { id: 'warehouse', name: 'Warehouse', x: 350, y: 80 },
    { id: 'market2', name: 'Local Store', x: 250, y: 200 },
    { id: 'export', name: 'Export Hub', x: 450, y: 150 },
  ];

  const edges: RouteEdge[] = [
    { from: 'farm', to: 'market1', distance: 15, isOptimal: true },
    { from: 'market1', to: 'warehouse', distance: 12, isOptimal: true },
    { from: 'warehouse', to: 'export', distance: 10, isOptimal: true },
    { from: 'farm', to: 'market2', distance: 20 },
    { from: 'market2', to: 'export', distance: 25 },
    { from: 'market1', to: 'market2', distance: 18 },
  ];

  const distance = edges.filter(e => e.isOptimal).reduce((sum, e) => sum + e.distance, 0);

  return { nodes, edges, distance };
};
