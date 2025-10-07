import { Truck, Clock, CheckCircle, Package } from 'lucide-react';
import { DeliveryQueueItem } from '../types';

interface DeliveryQueueProps {
  queue: DeliveryQueueItem[];
}

export default function DeliveryQueue({ queue }: DeliveryQueueProps) {
  if (queue.length === 0) {
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-5 h-5" />;
      case 'In Transit':
        return <Truck className="w-5 h-5" />;
      case 'Delivered':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <section id="delivery" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 animate-fadeIn">
      <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
        <Truck className="w-6 h-6 mr-2" />
        Delivery Queue
      </h2>

      <div className="space-y-4">
        {queue.map((item, index) => (
          <div
            key={item.id}
            className={`relative border-2 rounded-lg p-4 transition-all duration-300 hover:shadow-md ${getStatusColor(
              item.status
            )}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4 flex-1">
                <div className="mt-1">{getStatusIcon(item.status)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{item.crop_name}</h3>
                    <span className="text-xs font-semibold px-2 py-1 bg-white bg-opacity-50 rounded">
                      Priority #{index + 1}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Destination:</span> {item.destination}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold">Status:</span>
                      <span
                        className={`text-sm px-3 py-1 rounded-full font-semibold ${
                          item.status === 'Delivered'
                            ? 'bg-green-200 text-green-900'
                            : item.status === 'In Transit'
                            ? 'bg-blue-200 text-blue-900'
                            : 'bg-yellow-200 text-yellow-900'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {item.status === 'In Transit' && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg border border-green-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-gray-700">Total Items:</span>
            <span className="text-lg font-bold text-green-700">{queue.length}</span>
          </div>
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span>Pending: {queue.filter(q => q.status === 'Pending').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>In Transit: {queue.filter(q => q.status === 'In Transit').length}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span>Delivered: {queue.filter(q => q.status === 'Delivered').length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
