"use client"
import React, { useState, useRef } from 'react';
import { 
  Upload, 
  Video, 
  Image, 
  FileText, 
  Settings, 
  X, 
  Check, 
  AlertCircle,
  Play,
  Loader2,
  ArrowLeft
} from 'lucide-react';

interface VideoFormData {
  title: string;
  description: string;
  videoFile: File | null;
  thumbnailFile: File | null;
  controls: boolean;
  transformation: {
    width: number;
    height: number;
    quality: number;
  };
}




const VideoUpload= () => {
  const [formData, setFormData] = useState<VideoFormData>({
    title: '',
    description: '',
    videoFile: null,
    thumbnailFile: null,
    controls: true,
    transformation: {
      width: 1920,
      height: 1080,
      quality: 80
    }
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleVideoFile(files[0]);
    }
  };

  const handleVideoFile = (file: File) => {
    if (file.type.startsWith('video/')) {
      setFormData(prev => ({ ...prev, videoFile: file }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Clear video file error
      setErrors(prev => ({ ...prev, videoFile: '' }));
    } else {
      setErrors(prev => ({ ...prev, videoFile: 'Please select a valid video file' }));
    }
  };

  const handleThumbnailFile = (file: File) => {
    if (file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, thumbnailFile: file }));
      setErrors(prev => ({ ...prev, thumbnailFile: '' }));
    } else {
      setErrors(prev => ({ ...prev, thumbnailFile: 'Please select a valid image file' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.videoFile) {
      newErrors.videoFile = 'Video file is required';
    }

    if (!formData.thumbnailFile) {
      newErrors.thumbnailFile = 'Thumbnail image is required';
    }

    if (formData.transformation.quality < 1 || formData.transformation.quality > 100) {
      newErrors.quality = 'Quality must be between 1 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadToImageKit = async (file: File, type: 'video' | 'image') => {
    // Simulate ImageKit upload - replace with actual ImageKit integration
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`https://ik.imagekit.io/your-imagekit-id/${type}s/${file.name}`);
      }, 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Upload video to ImageKit
      setUploadProgress(25);
      const videoUrl = await uploadToImageKit(formData.videoFile!, 'video');
      
      // Upload thumbnail to ImageKit
      setUploadProgress(50);
      const thumbnailUrl = await uploadToImageKit(formData.thumbnailFile!, 'image');
      
      // Prepare final data
      setUploadProgress(75);
      const videoData = {
        title: formData.title,
        description: formData.description,
        videoUrl,
        thumbnailUrl,
        controls: formData.controls,
        transformation: formData.transformation
      };

      // Submit to your backend
      console.log('Video data to submit:', videoData);
      
      setUploadProgress(100);
      
      // Success feedback
      setTimeout(() => {
        alert('Video uploaded successfully!');
        // onBack();
      }, 500);

    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const dimensionPresets = [
    { name: 'HD (1920x1080)', width: 1920, height: 1080 },
    { name: 'Square (1080x1080)', width: 1080, height: 1080 },
    { name: 'Portrait (1080x1920)', width: 1080, height: 1920 },
    { name: 'Custom', width: 0, height: 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            // onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Your Video</h1>
          <p className="text-gray-600">Share your creativity with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Video Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Video className="h-6 w-6 mr-2 text-indigo-600" />
              Video File
            </h2>

            <div
              className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-indigo-400 bg-indigo-50' 
                  : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
              } ${errors.videoFile ? 'border-red-300 bg-red-50' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {formData.videoFile ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-green-100 p-4 rounded-full">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">{formData.videoFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(formData.videoFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  {previewUrl && (
                    <div className="max-w-md mx-auto">
                      <video
                        src={previewUrl}
                        controls
                        className="w-full rounded-lg shadow-md"
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, videoFile: null }));
                      setPreviewUrl('');
                    }}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Remove Video
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900">Drop your video here</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Supports MP4, MOV, AVI, WebM up to 2GB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Choose Video File
                  </button>
                </div>
              )}
              
              <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                onChange={(e) => e.target.files?.[0] && handleVideoFile(e.target.files[0])}
                className="hidden"
              />
            </div>
            
            {errors.videoFile && (
              <p className="mt-2 text-red-600 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.videoFile}
              </p>
            )}
          </div>

          {/* Thumbnail Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Image className="h-6 w-6 mr-2 text-indigo-600" />
              Thumbnail Image
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                    errors.thumbnailFile ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                  }`}
                >
                  {formData.thumbnailFile ? (
                    <div className="space-y-4">
                      <img
                        src={URL.createObjectURL(formData.thumbnailFile)}
                        alt="Thumbnail preview"
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <p className="text-sm font-medium text-gray-900">{formData.thumbnailFile.name}</p>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, thumbnailFile: null }))}
                        className="text-red-600 hover:text-red-700 font-medium text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-center">
                        <div className="bg-gray-200 p-3 rounded-full">
                          <Image className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => thumbnailInputRef.current?.click()}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                      >
                        Choose Thumbnail
                      </button>
                    </div>
                  )}
                </div>
                
                <input
                  ref={thumbnailInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleThumbnailFile(e.target.files[0])}
                  className="hidden"
                />
                
                {errors.thumbnailFile && (
                  <p className="mt-2 text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.thumbnailFile}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Thumbnail Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Use high-quality images (1280x720 recommended)</li>
                  <li>• Choose an engaging frame from your video</li>
                  <li>• Avoid text-heavy thumbnails</li>
                  <li>• Ensure good contrast and visibility</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Video Details Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-indigo-600" />
              Video Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter a catchy title for your video"
                />
                {errors.title && (
                  <p className="mt-1 text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Describe your video content..."
                />
                {errors.description && (
                  <p className="mt-1 text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.controls}
                    onChange={(e) => setFormData(prev => ({ ...prev, controls: e.target.checked }))}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Show video controls (play, pause, volume, etc.)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Transformation Settings */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Settings className="h-6 w-6 mr-2 text-indigo-600" />
              Transformation Settings
            </h2>

            <div className="space-y-6">
              {/* Dimension Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Video Dimensions
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dimensionPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        if (preset.width > 0) {
                          setFormData(prev => ({
                            ...prev,
                            transformation: {
                              ...prev.transformation,
                              width: preset.width,
                              height: preset.height
                            }
                          }));
                        }
                      }}
                      className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                        formData.transformation.width === preset.width && formData.transformation.height === preset.height
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-300 hover:border-indigo-300 text-gray-700'
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Dimensions */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={formData.transformation.width}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      transformation: { ...prev.transformation, width: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                    max="4096"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={formData.transformation.height}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      transformation: { ...prev.transformation, height: parseInt(e.target.value) || 0 }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                    max="4096"
                  />
                </div>
              </div>

              {/* Quality Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality: {formData.transformation.quality}%
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.transformation.quality}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    transformation: { ...prev.transformation, quality: parseInt(e.target.value) }
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low Quality</span>
                  <span>High Quality</span>
                </div>
                {errors.quality && (
                  <p className="mt-1 text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.quality}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
            //   onClick={onBack}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isUploading}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Uploading... {uploadProgress}%</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Upload Video</span>
                </>
              )}
            </button>
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Upload Progress</span>
                <span className="text-sm text-gray-500">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;   