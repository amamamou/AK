"use client";

import React, { useState } from "react";
import { Music, MoreVertical, Play, Trash2, Edit2, CheckCircle2, Radio } from "lucide-react";
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

  // Calculate duration
  const totalDurationMinutes = parseInt(playlist.totalDuration) || 0;
  const hours = Math.floor(totalDurationMinutes / 60);
  const minutes = totalDurationMinutes % 60;
  const durationStr = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

  return (
    <div className="group relative rounded-lg border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all duration-150 cursor-pointer overflow-hidden flex flex-col h-full">
      {/* Top section: Icon + Actions */}
      <div className="p-4 pb-3 flex items-start justify-between">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm">
          <Music size={24} className="text-white" />
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-gray-100 rounded"
            aria-label="Playlist actions"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onPlay?.(playlist.id);
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Play size={14} />
                Play
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit?.(playlist.id);
                }}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Edit2 size={14} />
                Edit program
              </button>
              <div className="h-px bg-gray-100" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete?.(playlist.id);
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title and metadata */}
      <div className="px-4 pb-3 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 truncate" title={playlist.title}>
          {playlist.title}
        </h3>
        <div className="mt-2 text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">{playlist.trackCount}</span>
            <span className="text-gray-500">{playlist.trackCount === 1 ? "track" : "tracks"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">{durationStr}</span>
            <span className="text-gray-500">total</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Usage indicators */}
      <div className="px-4 py-3 space-y-2">
        {/* Active in schedule indicator */}
        {playlist.usedInSchedule && (
          <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 px-2.5 py-1.5 rounded-md border border-green-100">
            <CheckCircle2 size={12} className="flex-shrink-0" />
            <span className="font-medium">Active in schedule</span>
          </div>
        )}

        {/* Spaces using this playlist */}
        {playlist.spacesCount > 0 && (
          <div className="flex items-center gap-2 text-xs text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-md border border-blue-100">
            <Radio size={12} className="flex-shrink-0" />
            <span className="font-medium">
              Used in {playlist.spacesCount} {playlist.spacesCount === 1 ? "space" : "spaces"}
            </span>
          </div>
        )}

        {/* Unused indicator */}
        {!playlist.usedInSchedule && playlist.spacesCount === 0 && (
          <div className="text-xs text-gray-600 px-2.5 py-1.5 rounded-md border border-gray-200 bg-gray-50">
            Not yet used
          </div>
        )}

        {/* Last modified */}
        {playlist.lastModified && (
          <div className="text-xs text-gray-500">
            Modified {playlist.lastModified}
          </div>
        )}
      </div>
    </div>
  );
}
