"use client";

import React, { useState, useRef, useEffect } from "react";
import { Music, Plus, X, Upload, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";

export type Playlist = {
  id: string;
  title: string;
  description?: string;
  trackCount: number;
  totalDuration: string;
  usedInSchedule: boolean;
  spacesCount: number;
  lastModified: string;
  cover?: string; // URL to cover image
  coverColor?: "indigo" | "blue" | "purple" | "slate" | "gray"; // gradient color preset
};

const coverGradients = {
  indigo: "from-indigo-400 to-indigo-600",
  blue: "from-blue-400 to-blue-600",
  purple: "from-purple-400 to-purple-600",
  slate: "from-slate-400 to-slate-600",
  gray: "from-gray-400 to-gray-600",
};

export default function CreatePlaylistModal({
  open,
  onClose,
  onCreatePlaylist,
}: {
  open: boolean;
  onClose: () => void;
  onCreatePlaylist?: (playlist: Playlist) => void;
}) {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDesc, setPlaylistDesc] = useState("");
  const [selectedColor, setSelectedColor] = useState<keyof typeof coverGradients>("indigo");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cleanup object URL on unmount or image change
  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      console.log("[v0] Invalid file type. Please upload an image.");
      return;
    }

    // Cleanup previous object URL
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    // Create new object URL for preview
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    setCoverImage(url);
  };

  const handleRemoveCover = () => {
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
      setObjectUrl(null);
    }
    setCoverImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCreate = () => {
    if (!playlistName.trim()) return;

    const playlist: Playlist = {
      id: Math.random().toString(36),
      title: playlistName,
      description: playlistDesc || undefined,
      trackCount: 0,
      totalDuration: "0m",
      usedInSchedule: false,
      spacesCount: 0,
      lastModified: "now",
      cover: coverImage || undefined,
      coverColor: coverImage ? undefined : selectedColor,
    };

    onCreatePlaylist?.(playlist);
    
    // Reset form
    setPlaylistName("");
    setPlaylistDesc("");
    setSelectedColor("indigo");
    handleRemoveCover();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && playlistName.trim()) {
      handleCreate();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!open) return null;

  const coverUrl = coverImage || `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><rect fill="%23placeholder"/></svg>')`;
  const gradientClass = !coverImage ? `bg-gradient-to-br ${coverGradients[selectedColor]}` : "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Create Playlist</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Cover Preview + Title Section */}
          <div className="flex gap-4">
            {/* Cover Preview */}
            <div className="flex-shrink-0">
              <div
                className={cn(
                  "w-24 h-24 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0",
                  gradientClass,
                  coverImage ? "bg-cover bg-center" : ""
                )}
                style={coverImage ? { backgroundImage: `url(${coverImage})` } : undefined}
              >
                {!coverImage && (
                  <Music size={32} className="text-white/50" />
                )}
              </div>
            </div>

            {/* Title & Description */}
            <div className="flex-1 space-y-2">
              <input
                autoFocus
                type="text"
                placeholder="Playlist name"
                value={playlistName}
                onChange={(e) => setPlaylistName(e.target.value)}
                onKeyDown={handleKeyDown}
                maxLength={100}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <textarea
                placeholder="Description (optional)"
                value={playlistDesc}
                onChange={(e) => setPlaylistDesc(e.target.value)}
                maxLength={200}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                rows={2}
              />
            </div>
          </div>

          {/* Cover Selection */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Cover</p>
            
            {/* Upload Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                aria-label="Upload cover image"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <Upload size={16} />
                Upload image
              </button>
            </div>

            {/* Remove Cover Button (if image uploaded) */}
            {coverImage && (
              <button
                onClick={handleRemoveCover}
                className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-red-700 bg-white hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
                Remove image
              </button>
            )}

            {/* Preset Colors */}
            {!coverImage && (
              <div className="flex gap-2">
                {(Object.keys(coverGradients) as Array<keyof typeof coverGradients>).map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-8 h-8 rounded-md border-2 transition-all flex-shrink-0",
                      `bg-gradient-to-br ${coverGradients[color]}`,
                      selectedColor === color ? "border-gray-900 ring-2 ring-gray-300" : "border-gray-300 hover:border-gray-400"
                    )}
                    title={color}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!playlistName.trim()}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-colors",
              playlistName.trim()
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            )}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
