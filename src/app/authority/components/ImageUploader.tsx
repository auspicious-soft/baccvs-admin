"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

interface ImageUploaderProps {
  onChange?: (files: File[]) => void;
  oldImages?: string[];
}

export default function ImageUploader({
  onChange,
  oldImages,
}: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 🔑 Notify parent when `files` changes
  useEffect(() => {
    if (onChange) {
      onChange(files);
    }
  }, [files, onChange]);

  useEffect(() => {
    if (oldImages) setImages(oldImages);
  }, [oldImages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setFiles((prev) => [...prev, ...newFiles]);
      setImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {images?.map((src, idx) => (
        <div
          key={idx}
          className="relative w-[120px] h-[120px] rounded-lg overflow-hidden border border-gray-300"
        >
          <Image src={src} alt="preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => handleRemove(idx)}
            className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      ))}

      {/* Add More box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="w-[120px] h-[120px] flex items-center justify-center border-2 border-[#888888] rounded-lg cursor-pointer text-red-500 font-medium"
      >
        + Add Image
      </div>

      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
