"use client";
// import { apiClient } from "@/lib/api-client";
import React, { useState } from "react";
import {
  Video,
  Image as ImageIcon,
  FileText,
  Settings,
  AlertCircle,
  ArrowLeft,
  Upload,
  Loader2,
  Check,
} from "lucide-react";
import FileUpload from "./FileUploads"; 

interface VideoFormData {
  title: string;
  description: string;
  videoUrl: string; // URL returned from ImageKit
  thumbnailUrl: string; // URL returned from ImageKit
  controls: boolean;
  transformation: {
    width: number;
    height: number;
    quality: number;
  };
}

const VideoUpload = () => {
  const [formData, setFormData] = useState<VideoFormData>({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    controls: true,
    transformation: {
      width: 1920,
      height: 1080,
      quality: 80,
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadProgress, setUploadProgress] = useState(0); // video upload progress
  const [isSubmitting, setIsSubmitting] = useState(false); // POST request

  const dimensionPresets = [
    { name: "HD (1920x1080)", width: 1920, height: 1080 },
    { name: "Square (1080x1080)", width: 1080, height: 1080 },
    { name: "Portrait (1080x1920)", width: 1080, height: 1920 },
    { name: "Custom", width: 0, height: 0 },
  ];

  /** Validate form before submit */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.videoUrl) newErrors.videoFile = "Video is required";
    if (!formData.thumbnailUrl) newErrors.thumbnailFile = "Thumbnail is required";
    if (formData.transformation.quality < 1 || formData.transformation.quality > 100) {
      newErrors.quality = "Quality must be between 1 and 100";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Submit handler */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
  // const payload: VideoFormData = {
  //   title: formData.title,
  //   description: formData.description,
  //   videoUrl: formData.videoUrl!,
  //   thumbnailUrl: formData.thumbnailUrl!,
  //   controls: formData.controls,
  //   transformation: {
  //     width: formData.transformation.width,
  //     height: formData.transformation.height,
  //     quality: formData.transformation.quality,
  //   },
  // };
    try {
      // await apiClient.createVideo(payload)
      const res = await fetch("/api/video", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          videoUrl: formData.videoUrl,
          thumbnailUrl: formData.thumbnailUrl,
          controls: formData.controls,
          transformation: formData.transformation,
        }),
      });

      if (!res.ok) throw new Error("Failed to upload");

      alert("Video uploaded successfully!");
      // reset if needed
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 mb-4 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Upload Your Video</h1>
          <p className="text-gray-600 dark:text-gray-300">Share your creativity with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Video Upload Section */}
          <div className="bg-white dark:bg-primary-500 rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <Video className="h-6 w-6 mr-2 text-indigo-600" />
              Video File
            </h2>

            {formData.videoUrl ? (
              <div className="space-y-4 text-center">
                <div className="flex justify-center">
                  <div className="bg-green-100 p-4 rounded-full">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <video src={formData.videoUrl} controls className="w-full rounded-lg shadow-md max-h-60" />
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, videoUrl: "" }))}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Remove Video
                </button>
              </div>
            ) : (
              <FileUpload
                fileType="video"
                onProgress={(p) => setUploadProgress(p)}
                onSuccess={(res) => setFormData((prev) => ({ ...prev, videoUrl: res.url }))}
              />
            )}

            {errors.videoFile && (
              <p className="mt-2 text-red-600 text-sm flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.videoFile}
              </p>
            )}
          </div>

          {/* Thumbnail Upload Section */}
          <div className="bg-white dark:bg-primary-500 rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <ImageIcon className="h-6 w-6 mr-2 text-indigo-600" />
              Thumbnail Image
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {formData.thumbnailUrl ? (
                  <div className="space-y-4 text-center">
                    <img src={formData.thumbnailUrl} alt="Thumbnail preview" className="w-full h-32 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, thumbnailUrl: "" }))}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <FileUpload
                    fileType="image"
                    onSuccess={(res) => setFormData((prev) => ({ ...prev, thumbnailUrl: res.url }))}
                  />
                )}

                {errors.thumbnailFile && (
                  <p className="mt-2 text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.thumbnailFile}
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium dark:text-gray-100 text-gray-900">Thumbnail Tips</h3>
                <ul className="text-sm dark:text-gray-400 text-gray-600 space-y-2">
                  <li>• Use high-quality images (1280x720 recommended)</li>
                  <li>• Choose an engaging frame from your video</li>
                  <li>• Avoid text-heavy thumbnails</li>
                  <li>• Ensure good contrast and visibility</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Video Details Section */}
          <div className="bg-white dark:bg-primary-500 rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-indigo-600" />
              Video Details
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.title ? "border-red-300" : "border-gray-300"}`}
                  placeholder="Enter a catchy title for your video"
                />
                {errors.title && (
                  <p className="mt-1 text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.description ? "border-red-300" : "border-gray-300"}`}
                  placeholder="Describe your video content..."
                />
                {errors.description && (
                  <p className="mt-1 text-red-600 text-sm flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Controls Toggle */}
              <div className="md:col-span-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.controls}
                    onChange={(e) => setFormData((prev) => ({ ...prev, controls: e.target.checked }))}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Show video controls (play, pause, volume, etc.)</span>
                </label>
              </div>
            </div>
          </div>

          {/* Transformation Settings */}
          <div className="bg-white dark:bg-primary-500 rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
              <Settings className="h-6 w-6 mr-2 text-indigo-600" />
              Transformation Settings
            </h2>

            <div className="space-y-6">
              {/* Dimension Presets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Video Dimensions</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dimensionPresets.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => {
                        if (preset.width > 0) {
                          setFormData((prev) => ({
                            ...prev,
                            transformation: {
                              ...prev.transformation,
                              width: preset.width,
                              height: preset.height,
                            },
                          }));
                        }
                      }}
                      className={`p-3 text-sm font-medium rounded-lg border transition-colors ${formData.transformation.width === preset.width && formData.transformation.height === preset.height ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-300 hover:border-indigo-300 text-gray-700 dark:text-gray-300"}`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Dimensions */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">Width (px)</label>
                  <input
                    type="number"
                    value={formData.transformation.width}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        transformation: {
                          ...prev.transformation,
                          width: parseInt(e.target.value) || 0,
                        },
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                    max="4096"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Height (px)</label>
                  <input
                    type="number"
                    value={formData.transformation.height}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        transformation: {
                          ...prev.transformation,
                          height: parseInt(e.target.value) || 0,
                        },
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="1"
                    max="4096"
                  />
                </div>
              </div>

              {/* Quality Slider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quality: {formData.transformation.quality}%</label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={formData.transformation.quality}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      transformation: {
                        ...prev.transformation,
                        quality: parseInt(e.target.value),
                      },
                    }))
                  }
                  className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
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
              className="px-8 py-3 border dark:bg-gray-300 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  <span>Upload Video</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUpload;
