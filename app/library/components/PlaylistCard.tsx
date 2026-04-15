"use client";

import React, { useState } from "react";
import { Music, MoreVertical, Play, Trash2, Edit2 } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Playlist } from "./PlaylistModal";

export default function PlaylistCard({
  playlist,
  onPlay,
  onEdit,
  onDelete,
}: {
  playlist: Playlist;
  onPlay?: (playlistId: string) => void;
  onEdit?: (playlistId: string) => void;
  onDelete?: (playlistId: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const totalDuration = playlist.tracks.reduce((sum, track) => sum + track.durationMinutes, 0);
  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;
  const durationStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="group relative rounded-lg border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all duration-150 cursor-pointer overflow-hidden">
      {/* Cover area */}
      <div className="p-4 pb-3 flex items-start justify-between">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center flex-shrink-0">
          <Music size={24} className="text-white" />
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-100 rounded"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onPlay?.(playlist.id);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Play size={14} />
                Play
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit?.(playlist.id);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Edit2 size={14} />
                Edit
              </button>
              <div className="h-px bg-gray-100" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete?.(playlist.id);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info section */}
      <div className="px-4 pb-3">
        <h3 className="text-sm font-semibold text-gray-900 truncate" title={playlist.title}>
          {playlist.title}
        </h3>
        {playlist.description && (
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{playlist.description}</p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Footer */}
      <div className="px-4 py-3 flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium">
          {playlist.trackCount} {playlist.trackCount === 1 ? "track" : "tracks"}
        </span>
        <span>{durationStr}</span>
      </div>
    </div>
  );
}
