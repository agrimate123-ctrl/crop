import { Sprout } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sprout className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Smart Crop Sorting & Delivery System</h1>
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#upload" className="hover:text-yellow-300 transition-colors duration-200">Upload</a>
            <a href="#detection" className="hover:text-yellow-300 transition-colors duration-200">Detection</a>
            <a href="#delivery" className="hover:text-yellow-300 transition-colors duration-200">Delivery</a>
            <a href="#route" className="hover:text-yellow-300 transition-colors duration-200">Route</a>
          </div>
        </div>
      </div>
    </nav>
  );
}
