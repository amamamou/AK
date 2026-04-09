"use client";

import React, { useMemo, useState } from "react";
import { Search, ListMusic, MoreVertical, Plus, FileAudio } from "lucide-react";
import { cn } from "../../utils/cn";
import ViewToggle from "../players/components/ViewToggle";

const categories = ["All", "Yoga", "Meditation", "Lobby", "Retail"];

const library = [
  { id: "a1", title: "Morning Flow", duration: "60m", category: "Yoga" },
  { id: "a2", title: "Deep Focus", duration: "120m", category: "Meditation" },
  { id: "a3", title: "Lobby Ambience Loop", duration: "180m", category: "Lobby" },
  { id: "a4", title: "Upbeat Playlist", duration: "120m", category: "Retail" },
  { id: "a5", title: "Nature Walk", duration: "45m", category: "Meditation" },
  { id: "a6", title: "Evening Rest", duration: "90m", category: "Yoga" },
];

export default function LibraryClient() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [view, setView] = useState<"list" | "grid">("grid");

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
                  Manage and organize your audio content
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <ViewToggle view={view} onChange={setView} />

                <button
                  type="button"
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
          {filteredLibrary.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="text-center space-y-2">
                <h2 className="text-sm font-semibold text-gray-900">
                  No audio matches your filters
                </h2>
                <p className="text-xs text-gray-500 max-w-sm">
                  Try adjusting your search or category filters, or upload new content to your library.
                </p>
              </div>
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredLibrary.map((audio) => (
                <div
                  key={audio.id}
                  className="group bg-white border border-gray-200 rounded-md p-4 hover:border-gray-300 hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="p-3 bg-gray-50 text-gray-600 rounded-md border border-gray-100 group-hover:bg-gray-100 transition-colors">
                      <FileAudio size={24} />
                    </div>
                    <button className="text-gray-400 hover:text-gray-700">
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{audio.title}</h3>
                    <p className="text-xs text-gray-500">{audio.category}</p>
                  </div>

                  <div className="mt-2 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <ListMusic size={14} /> Playlist
                    </span>
                    <span className="font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-sm">
                      {audio.duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredLibrary.map((audio) => (
                <div
                  key={audio.id}
                  className="flex items-center gap-3 rounded-md border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="p-2 rounded-md border border-gray-200 bg-gray-50 text-gray-600">
                      <FileAudio size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">{audio.title}</div>
                      <div className="mt-0.5 text-xs text-gray-500">{audio.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium text-gray-700 bg-gray-100 px-2 py-0.5 rounded-sm">
                      {audio.duration}
                    </span>
                    <button className="text-gray-400 hover:text-gray-700">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
