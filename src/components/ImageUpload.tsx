import { useState } from 'react';
import { Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onDetect: (file: File) => Promise<void>;
  isLoading: boolean;
}

export default function ImageUpload({ onDetect, isLoading }: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetect = async () => {
    if (selectedImage) {
      await onDetect(selectedImage);
    }
  };

  return (
    <section id="upload" className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center">
        <Upload className="w-6 h-6 mr-2" />
        Upload Crop Image
      </h2>

      <div className="space-y-4">
        <div className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors duration-200">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="image-upload"
            disabled={isLoading}
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center justify-center"
          >
            <ImageIcon className="w-16 h-16 text-green-600 mb-4" />
            <span className="text-lg text-gray-700 font-medium">
              {selectedImage ? selectedImage.name : 'Click to select an image'}
            </span>
            <span className="text-sm text-gray-500 mt-2">Supports: JPG, PNG, JPEG</span>
          </label>
        </div>

        {previewUrl && (
          <div className="mt-4 animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Image Preview:</h3>
            <div className="relative rounded-lg overflow-hidden border-4 border-green-200">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-auto max-h-96 object-contain bg-gray-50"
              />
            </div>
          </div>
        )}

        {selectedImage && (
          <button
            onClick={handleDetect}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-green-600 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="w-5 h-5 mr-2" />
                Run Detection
              </>
            )}
          </button>
        )}
      </div>
    </section>
  );
}
