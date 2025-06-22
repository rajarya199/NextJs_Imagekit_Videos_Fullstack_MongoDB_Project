"use client";

import { upload } from "@imagekit/next";
import React, { useRef, useState } from "react";
import { AlertCircle, Upload, Check, X, Video, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUploads = ({ onSuccess, onProgress, fileType = "image" }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const validateFile = (file: File) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }
    if (fileType === "image" && !file.type.startsWith("image/")) {
      setError("Please upload a valid image file");
      return false;
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100MB");
      return false;
    }
    return true;
  };

  const handleFileChange = async (file: File) => {
    if (!validateFile(file)) return;
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const authRes = await fetch("/api/imagekit-auth");
      if (!authRes.ok) {
  const errorText = await authRes.text();
  throw new Error(`Auth API error: ${errorText}`);
}
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
            onProgress?.(percent);
          }
        },
      });
      console.log("video data :",res)
setUploadedUrl(res.url ?? "");

      setFileName(file.name);
      onSuccess(res);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current?.classList.add("bg-indigo-50", "border-indigo-400");
  };

  const handleDragLeave = () => {
    dropZoneRef.current?.classList.remove("bg-indigo-50", "border-indigo-400");
  };

  const handleRemove = () => {
    setUploadedUrl("");
    setProgress(0);
    setFileName("");
    setError(null);
  };

  return (
    <div>
      {uploadedUrl ? (
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="bg-green-100 p-4 rounded-full">
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-700">{fileName}</p>

          {fileType === "image" ? (
            <img
              src={uploadedUrl}
              alt="Preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          ) : (
            <video
              src={uploadedUrl}
              controls
              className="w-full rounded-lg shadow-md max-h-60"
            />
          )}

          <button
            type="button"
            onClick={handleRemove}
            className="text-red-600 hover:text-red-700 font-medium text-sm"
          >
            <X className="inline w-4 h-4 mr-1" />
            Remove File
          </button>
        </div>
      ) : (
        <div
          ref={dropZoneRef}
          className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full">
              {fileType === "video" ? (
                <Video className="h-8 w-8 text-white" />
              ) : (
                <ImageIcon className="h-8 w-8 text-white" />
              )}
            </div>
          </div>

          <p className="text-lg font-medium text-gray-900 mb-1">
            Drag and drop your {fileType} here
          </p>
          <p className="text-sm text-gray-500 mb-4">or click to select a file</p>

          <input
            ref={fileInputRef}
            type="file"
            accept={fileType === "video" ? "video/*" : "image/*"}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileChange(file);
            }}
          />
        </div>
      )}

      {uploading && (
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-700 mb-1">
            <span>Uploading...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-red-600 text-sm flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUploads;
