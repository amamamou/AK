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

  return (
    <div className="group relative rounded-lg border border-gray-200 bg-white hover:shadow-md hover:border-gray-300 transition-all duration-150 overflow-hidden flex flex-col h-full">
      {/* Header with icon and menu */}
      <div className="p-4 flex items-start justify-between border-b border-gray-100">
        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
          <Music size={20} className="text-gray-600" />
        </div>
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
            aria-label="Playlist actions"
          >
            <MoreVertical size={16} />
          </button>

          {menuOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute right-0 z-50 mt-1 w-40 overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
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

      {/* Content */}
      <div className="px-4 py-3 flex-1 space-y-3">
        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 truncate" title={playlist.title}>
          {playlist.title}
        </h3>

        {/* Metadata */}
        <div className="text-xs text-gray-600 space-y-1">
          <div>{playlist.trackCount} tracks</div>
          <div>{playlist.totalDuration} total</div>
        </div>

        {/* Usage context */}
        {(playlist.usedInSchedule || playlist.spacesCount > 0) && (
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
            {playlist.usedInSchedule && (
              <div>Used in {playlist.spacesCount} schedule{playlist.spacesCount !== 1 ? "s" : ""}</div>
            )}
            {!playlist.usedInSchedule && playlist.spacesCount > 0 && (
              <div>Active in {playlist.spacesCount} space{playlist.spacesCount !== 1 ? "s" : ""}</div>
            )}
          </div>
        )}

        {!playlist.usedInSchedule && playlist.spacesCount === 0 && (
          <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
            Not scheduled
          </div>
        )}
      </div>
    </div>
  );
}
