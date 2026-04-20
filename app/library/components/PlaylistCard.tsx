"use client";

import React, { useState } from "react";
import { Music, MoreVertical, Play, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";
import type { Playlist } from "./PlaylistModal";

// Cover gradient presets
const coverGradients = {
  indigo: "from-indigo-400 to-indigo-600",
  blue: "from-blue-400 to-blue-600",
  purple: "from-purple-400 to-purple-600",
  slate: "from-slate-400 to-slate-600",
  gray: "from-gray-400 to-gray-600",
};

export default function PlaylistCard({
  playlist,
  onPlay,
  onEdit,
  onDelete,
  onClick,
}: {
  playlist: Playlist;
  onPlay?: (playlistId: string) => void;
  onEdit?: (playlistId: string) => void;
  onDelete?: (playlistId: string) => void;
  onClick?: (playlistId: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const gradientClass = coverGradients[playlist.coverColor || "indigo"];

  return (
    <div
      onClick={() => onClick?.(playlist.id)}
      className="group relative rounded-lg overflow-hidden bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      {/* Cover Image / Gradient */}
      <div
        className={cn(
          "relative h-40 bg-gradient-to-br overflow-hidden",
          gradientClass,
          "group-hover:shadow-md transition-all duration-300"
        )}
      >
        {playlist.cover ? (
          <img
            src={playlist.cover}
            alt={playlist.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music size={48} className="text-white/40" />
          </div>
        )}

        {/* Overlay on hover with quick actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay?.(playlist.id);
            }}
            className="p-2.5 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-md transition-all hover:scale-110"
            title="Play"
          >
            <Play size={18} className="fill-current" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(playlist.id);
            }}
            className="p-2.5 bg-white/90 hover:bg-white text-gray-900 rounded-full shadow-md transition-all hover:scale-110"
            title="Edit"
          >
            <Edit2 size={18} />
          </button>
        </div>

        {/* Status badge */}
        {playlist.usedInSchedule && (
          <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 text-xs font-medium text-green-700 rounded-full backdrop-blur-sm">
            Active now
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        {/* Title and metadata */}
        <div className="space-y-2 mb-3">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2" title={playlist.title}>
            {playlist.title}
          </h3>
          {playlist.description && (
            <p className="text-xs text-gray-500 line-clamp-2">{playlist.description}</p>
          )}
        </div>

        {/* Footer info */}
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600">
              {playlist.trackCount} {playlist.trackCount === 1 ? "track" : "tracks"}
            </span>
            <span className="text-gray-500">{playlist.totalDuration}</span>
          </div>
          {playlist.spacesCount > 0 && (
            <div className="text-xs text-gray-500">
              {playlist.spacesCount} space{playlist.spacesCount !== 1 ? "s" : ""}
            </div>
          )}
          {playlist.spacesCount === 0 && !playlist.usedInSchedule && (
            <div className="text-xs text-gray-400">Not scheduled</div>
          )}
        </div>
      </div>

      {/* Menu button */}
      <div className="absolute top-3 left-3">
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="p-1.5 bg-white/80 hover:bg-white text-gray-600 rounded-lg shadow-sm transition-all opacity-0 group-hover:opacity-100"
            aria-label="Playlist actions"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute left-0 top-full mt-2 z-50 w-36 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
            >
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onPlay?.(playlist.id);
                }}
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Play size={12} />
                Play
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onEdit?.(playlist.id);
                }}
                className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Edit2 size={12} />
                Edit
              </button>
              <div className="h-px bg-gray-100" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onDelete?.(playlist.id);
                }}
                className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <Trash2 size={12} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
