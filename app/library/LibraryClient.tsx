"use client";

import React, { useMemo, useState } from "react";
import { Search, Plus, FileAudio, Music } from "lucide-react";
import { cn } from "../../utils/cn";
import ViewToggle from "../players/components/ViewToggle";
import AudioGrid from "./components/AudioGrid";
import AudioList from "./components/AudioList";
import UploadModal from "./components/UploadModal";
import PlaylistModal from "./components/PlaylistModal";
import PlaylistCard from "./components/PlaylistCard";
import AddToPlaylistModal from "./components/AddToPlaylistModal";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";
import type { AudioItem } from "./components/AudioTile";
import type { Playlist } from "./components/PlaylistModal";

const categories = ["All", "Yoga", "Meditation", "Lobby", "Retail"];

const library: AudioItem[] = [
  { id: "a1", title: "Morning Flow", duration: "60m", durationMinutes: 60, category: "Yoga", usageCount: 24, spacesCount: 3, lastPlayed: "today", isScheduled: true, color: "purple" },
  { id: "a2", title: "Deep Focus", duration: "120m", durationMinutes: 120, category: "Meditation", usageCount: 18, spacesCount: 2, lastPlayed: "2 days ago", isScheduled: true, color: "blue" },
  { id: "a3", title: "Lobby Ambience Loop", duration: "180m", durationMinutes: 180, category: "Lobby", usageCount: 5, spacesCount: 1, lastPlayed: undefined, isScheduled: false, color: "amber" },
  { id: "a4", title: "Upbeat Playlist", duration: "120m", durationMinutes: 120, category: "Retail", usageCount: 12, spacesCount: 2, lastPlayed: "yesterday", isScheduled: true, color: "orange" },
  { id: "a5", title: "Nature Walk", duration: "45m", durationMinutes: 45, category: "Meditation", usageCount: 3, spacesCount: 1, lastPlayed: "1 week ago", isScheduled: false, color: "green" },
  { id: "a6", title: "Evening Rest", duration: "90m", durationMinutes: 90, category: "Yoga", usageCount: 14, spacesCount: 2, lastPlayed: "3 days ago", isScheduled: true, color: "indigo" },
];


export default function LibraryClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [view, setView] = useState<"list" | "grid" | "playlists">("grid");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [playlistModalOpen, setPlaylistModalOpen] = useState(false);
  const [addToPlaylistOpen, setAddToPlaylistOpen] = useState(false);
  const [selectedAudioForPlaylist, setSelectedAudioForPlaylist] = useState<AudioItem | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedAudioForDelete, setSelectedAudioForDelete] = useState<AudioItem | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  const filteredLibrary = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return library.filter((item) => {
      if (activeCategory !== "All" && item.category !== activeCategory) {
        return false;
      }

      if (!normalizedQuery) return true;

      const haystack = `${item.title} ${item.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [query, activeCategory]);

  const totalCount = library.length;
  const filteredCount = filteredLibrary.length;
  const showingAll = totalCount === filteredCount;

  const handleAudioAction = (action: "play" | "edit" | "delete" | "addToPlaylist", audioId: string) => {
    const audio = library.find((a) => a.id === audioId);
    if (!audio) return;

    switch (action) {
      case "play":
        console.log("[v0] Playing audio:", audioId);
        break;
      case "addToPlaylist":
        setSelectedAudioForPlaylist(audio);
        setAddToPlaylistOpen(true);
        break;
      case "edit":
        console.log("[v0] Editing audio:", audioId);
        break;
      case "delete":
        setSelectedAudioForDelete(audio);
        setDeleteOpen(true);
        break;
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      {/* Header, matching Players style */}
      <div className="bg-white">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Audio Library</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Control-ready asset system for managing your audio content
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <ViewToggle view={view === "playlists" ? "grid" : view} onChange={(v) => setView(v)} />

                <button
                  type="button"
                  onClick={() => setPlaylistModalOpen(true)}
                  className="hidden sm:inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <Music size={14} />
                  <span>Playlists</span>
                </button>

                <button
                  type="button"
                  onClick={() => setUploadOpen(true)}
                  className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Upload audio</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar, mirroring Players toolbar pattern */}
      <div className="border-b border-gray-100 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
          {/* Left: Search */}
          <div className="flex flex-col gap-1.5 min-w-0 flex-1">
            <div className="relative w-full max-w-md" role="search">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                aria-label="Search library"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or category..."
                className="w-full pl-9 pr-8 py-1.5 text-sm rounded-md bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-gray-600"
                >
                  <span className="text-xs font-medium">×</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Count + Categories */}
          <div className="flex items-center gap-3 md:gap-4 justify-between md:justify-end overflow-x-auto">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-600 flex-shrink-0">
              <FileAudio size={14} className="text-gray-400" />
              {totalCount === 0 ? (
                <span>No tracks</span>
              ) : showingAll ? (
                <span>
                  Showing all {totalCount} {totalCount === 1 ? "track" : "tracks"}
                </span>
              ) : (
                <span>
                  Showing {filteredCount} of {totalCount} tracks
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-xs font-medium border whitespace-nowrap transition-colors",
                    activeCategory === cat
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100",
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <div className="px-4 py-4">
          {view === "playlists" ? (
            playlists.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
                    <Music size={24} className="text-gray-400" />
                  </div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    No playlists created yet
                  </h2>
                  <p className="text-xs text-gray-500 max-w-sm">
                    Create your first playlist to organize and group audio content together.
                  </p>
                  <button
                    onClick={() => setPlaylistModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-md bg-gray-900 text-white px-4 py-2 text-xs font-medium hover:bg-gray-800 transition-colors mt-2"
                  >
                    <Plus size={14} />
                    Create Playlist
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {playlists.map((playlist) => (
                  <PlaylistCard
                    key={playlist.id}
                    playlist={playlist}
                    onPlay={(id) => console.log("[v0] Playing playlist:", id)}
                    onEdit={(id) => console.log("[v0] Editing playlist:", id)}
                    onDelete={(id) => {
                      setPlaylists((prev) => prev.filter((p) => p.id !== id));
                    }}
                  />
                ))}
              </div>
            )
          ) : filteredLibrary.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-100">
                  <FileAudio size={24} className="text-gray-400" />
                </div>
                <h2 className="text-sm font-semibold text-gray-900">
                  No audio matches your filters
                </h2>
                <p className="text-xs text-gray-500 max-w-sm">
                  Try adjusting your search or category filters, or upload new content to your library.
                </p>
                {activeCategory === "All" && query === "" && (
                  <div className="pt-2 space-y-1.5 text-left">
                    <div className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Quick suggestions:</div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      <li>• Upload a new audio file</li>
                      <li>• Or reuse an existing track</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : view === "grid" ? (
            <AudioGrid items={filteredLibrary} onAudioAction={handleAudioAction} />
          ) : (
            <AudioList items={filteredLibrary} onAudioAction={handleAudioAction} />
          )}
        </div>
      </div>

      <UploadModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onUpload={(files) => {
          console.log("[v0] Files uploaded:", files);
          // TODO: Add uploaded files to library
        }}
      />

      <PlaylistModal
        open={playlistModalOpen}
        onClose={() => setPlaylistModalOpen(false)}
        playlists={playlists}
        onCreatePlaylist={(playlist) => {
          setPlaylists((prev) => [...prev, playlist]);
          console.log("[v0] Playlist created:", playlist);
        }}
        onAddToPlaylist={(playlistId, trackId) => {
          console.log("[v0] Added track to playlist:", playlistId, trackId);
        }}
      />

      <AddToPlaylistModal
        open={addToPlaylistOpen}
        onClose={() => {
          setAddToPlaylistOpen(false);
          setSelectedAudioForPlaylist(null);
        }}
        audioTitle={selectedAudioForPlaylist?.title}
        playlists={playlists}
        onAdd={(playlistId) => {
          console.log("[v0] Added to playlist:", playlistId, selectedAudioForPlaylist?.id);
        }}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedAudioForDelete(null);
        }}
        title="Delete Audio"
        itemName={selectedAudioForDelete?.title || "audio"}
        description={`This will permanently delete "${selectedAudioForDelete?.title}". This action cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={() => {
          console.log("[v0] Deleted audio:", selectedAudioForDelete?.id);
        }}
      />
    </div>
  );
}
