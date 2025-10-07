import { useEffect, useRef } from 'react';
import { Map, Navigation } from 'lucide-react';
import { RouteNode, RouteEdge } from '../types';

interface RouteVisualizationProps {
  nodes: RouteNode[];
  edges: RouteEdge[];
  totalDistance: number;
}

export default function RouteVisualization({ nodes, edges, totalDistance }: RouteVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || nodes.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);

      if (fromNode && toNode) {
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);

        if (edge.isOptimal) {
          ctx.strokeStyle = '#16a34a';
          ctx.lineWidth = 4;
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = '#d1d5db';
          ctx.lineWidth = 2;
          ctx.setLineDash([5, 5]);
        }

        ctx.stroke();

        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;

        ctx.fillStyle = edge.isOptimal ? '#16a34a' : '#6b7280';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`${edge.distance}km`, midX + 5, midY - 5);

        if (edge.isOptimal) {
          const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
          const arrowX = toNode.x - 15 * Math.cos(angle);
          const arrowY = toNode.y - 15 * Math.sin(angle);

          ctx.save();
          ctx.translate(arrowX, arrowY);
          ctx.rotate(angle);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-10, -5);
          ctx.lineTo(-10, 5);
          ctx.closePath();
          ctx.fillStyle = '#16a34a';
          ctx.fill();
          ctx.restore();
        }
      }
    });

    nodes.forEach(node => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fillStyle = node.id === 'farm' ? '#eab308' : '#16a34a';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const initial = node.name.charAt(0);
      ctx.fillText(initial, node.x, node.y);

      ctx.fillStyle = '#1f2937';
      ctx.font = '12px sans-serif';
      ctx.fillText(node.name, node.x, node.y + 35);
    });
  }, [nodes, edges]);

  if (nodes.length === 0) {
    return null;
  }

  return (
    <section id="route" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
      <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
        <Map className="w-6 h-6 mr-2" />
        Route Optimization
      </h2>

      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Navigation className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-gray-700">Algorithm:</span>
            <span className="text-lg font-bold text-green-700">Dijkstra's Shortest Path</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-gray-700">Total Distance:</span>
            <span className="text-2xl font-bold text-blue-600">{totalDistance} km</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
        <canvas
          ref={canvasRef}
          width={550}
          height={280}
          className="w-full h-auto"
        />
      </div>

      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-1 bg-green-600 rounded"></div>
          <span className="text-gray-700">Optimal Route</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-1 bg-gray-300 rounded" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #d1d5db 0, #d1d5db 5px, transparent 5px, transparent 10px)' }}></div>
          <span className="text-gray-700">Alternative Route</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-yellow-500 rounded-full border-2 border-white"></div>
          <span className="text-gray-700">Farm</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-green-600 rounded-full border-2 border-white"></div>
          <span className="text-gray-700">Destination</span>
        </div>
      </div>
    </section>
  );
}
