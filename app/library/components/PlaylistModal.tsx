"use client";

import React, { useState } from "react";
import { Music, Plus, X, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";
import type { AudioItem } from "./AudioTile";

export type Playlist = {
  id: string;
  title: string;
  description?: string;
  duration: number;
  trackCount: number;
  createdAt: string;
  isPublic: boolean;
  tracks: AudioItem[];
};

export default function PlaylistModal({
  open,
  onClose,
  playlists = [],
  onCreatePlaylist,
  onAddToPlaylist,
}: {
  open: boolean;
  onClose: () => void;
  playlists?: Playlist[];
  onCreatePlaylist?: (playlist: Playlist) => void;
  onAddToPlaylist?: (playlistId: string, trackId: string) => void;
}) {
  const [creating, setCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDesc, setNewPlaylistDesc] = useState("");

  const handleCreate = () => {
    if (!newPlaylistName.trim()) return;

    const playlist: Playlist = {
      id: Math.random().toString(36),
      title: newPlaylistName,
      description: newPlaylistDesc,
      duration: 0,
      trackCount: 0,
      createdAt: new Date().toISOString(),
      isPublic: false,
      tracks: [],
    };

    onCreatePlaylist?.(playlist);
    setNewPlaylistName("");
    setNewPlaylistDesc("");
    setCreating(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl mx-4 bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Manage Playlists</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {/* Create New Playlist Section */}
          {!creating ? (
            <button
              onClick={() => setCreating(true)}
              className="w-full flex items-center gap-3 p-4 rounded-lg border border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-colors text-left"
            >
              <Plus size={20} className="text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Create new playlist</p>
                <p className="text-xs text-gray-500">Organize your audio content</p>
              </div>
            </button>
          ) : (
            <div className="p-4 rounded-lg border border-gray-200 bg-gray-50 space-y-3">
              <input
                autoFocus
                type="text"
                placeholder="Playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreate();
                  if (e.key === "Escape") {
                    setCreating(false);
                    setNewPlaylistName("");
                    setNewPlaylistDesc("");
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <textarea
                placeholder="Description (optional)"
                value={newPlaylistDesc}
                onChange={(e) => setNewPlaylistDesc(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreate}
                  disabled={!newPlaylistName.trim()}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    newPlaylistName.trim()
                      ? "bg-gray-900 text-white hover:bg-gray-800"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  )}
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setCreating(false);
                    setNewPlaylistName("");
                    setNewPlaylistDesc("");
                  }}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Existing Playlists */}
          {playlists.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Your Playlists</p>
              {playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Music size={18} className="text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{playlist.title}</p>
                    <p className="text-xs text-gray-500">
                      {playlist.trackCount} {playlist.trackCount === 1 ? "track" : "tracks"}
                    </p>
                  </div>
                  <button
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {playlists.length === 0 && !creating && (
            <div className="text-center py-8">
              <Music size={32} className="mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-500">No playlists yet</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
