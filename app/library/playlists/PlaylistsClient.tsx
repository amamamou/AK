"use client";

import React, { useState } from "react";
import { Plus, Music } from "lucide-react";
import { useRouter } from "next/navigation";
import PlaylistCard from "../components/PlaylistCard";
import PlaylistModal from "../components/PlaylistModal";
import type { Playlist } from "../components/PlaylistModal";

// Mock sample playlists
const samplePlaylists: Playlist[] = [
  {
    id: "p1",
    title: "Morning Yoga",
    description: "Energizing flows to start your day",
    trackCount: 3,
    totalDuration: "180m",
    usedInSchedule: true,
    spacesCount: 2,
    lastModified: "2 days ago",
    coverColor: "indigo",
  },
  {
    id: "p2",
    title: "Evening Relaxation",
    description: "Calm and soothing soundscapes",
    trackCount: 5,
    totalDuration: "300m",
    usedInSchedule: true,
    spacesCount: 3,
    lastModified: "1 week ago",
    coverColor: "blue",
  },
  {
    id: "p3",
    title: "Meditation Session",
    description: "Deep meditation and mindfulness",
    trackCount: 4,
    totalDuration: "240m",
    usedInSchedule: false,
    spacesCount: 0,
    lastModified: "3 days ago",
    coverColor: "purple",
  },
];

export default function LibraryPlaylistsClient() {
  const router = useRouter();
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>(samplePlaylists);

  const handlePlaylistClick = (playlistId: string) => {
    router.push(`/library/playlists/${playlistId}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Playlists</h1>
              <p className="mt-1 text-sm text-gray-500">
                Create and manage playback programs for your spaces
              </p>
            </div>

            <button
              type="button"
              onClick={() => setPlaylistModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <Plus size={16} />
              <span>New playlist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto bg-white">
        <div className="px-6 py-6">
          {playlists.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center space-y-4 max-w-sm">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gray-100">
                  <Music size={28} className="text-gray-400" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">No playlists yet</h2>
                <p className="text-sm text-gray-600">
                  Create your first playlist to organize and reuse audio content across your spaces.
                </p>
                <button
                  onClick={() => setPlaylistModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors mt-4"
                >
                  <Plus size={16} />
                  Create playlist
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {playlists.length} {playlists.length === 1 ? "playlist" : "playlists"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {playlists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onClick={handlePlaylistClick}
                    onPlay={(id) => console.log("[v0] Playing playlist:", id)}
                    onEdit={(id) => console.log("[v0] Editing playlist:", id)}
                    onDelete={(id) => {
                      setPlaylists((prev) => prev.filter((p) => p.id !== id));
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create playlist modal */}
      <PlaylistModal
        open={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        onCreatePlaylist={(playlist) => {
          setPlaylists((prev) => [...prev, playlist]);
          console.log("[v0] Playlist created:", playlist);
        }}
      />
    </div>
  );
}
