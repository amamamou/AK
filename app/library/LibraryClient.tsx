"use client";

import React, { useMemo, useState } from "react";
import { Search, MoreVertical, Plus, FileAudio, Clock, RadioTower, Activity, ArrowRight } from "lucide-react";
import { cn } from "../../utils/cn";
import ViewToggle from "../players/components/ViewToggle";

const categories = ["All", "Yoga", "Meditation", "Lobby", "Retail"];

type AudioItem = {
  id: string;
  title: string;
  duration: string;
  durationMinutes: number;
  category: string;
  usageCount: number;
  spacesCount: number;
  lastPlayed?: string;
  isScheduled: boolean;
  color?: string;
};

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

  const categoryColor = {
    Yoga: "bg-purple-50 text-purple-700 border-purple-100",
    Meditation: "bg-blue-50 text-blue-700 border-blue-100",
    Lobby: "bg-amber-50 text-amber-700 border-amber-100",
    Retail: "bg-orange-50 text-orange-700 border-orange-100",
  };

  const getUsageColor = (usageCount: number) => {
    if (usageCount > 15) return "border-l-emerald-500";
    if (usageCount > 8) return "border-l-blue-500";
    return "border-l-gray-300";
  };

  const getUsageLabel = (usageCount: number) => {
    if (usageCount > 15) return "Frequently used";
    if (usageCount > 8) return "Regularly used";
    if (usageCount > 0) return "Occasionally used";
    return "Never used";
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
                {showingAll && (
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredLibrary.map((audio, idx) => (
                <div
                  key={audio.id}
                  className={cn(
                    "group relative rounded-lg border transition-all duration-150 cursor-pointer overflow-hidden",
                    idx % 5 === 4 ? "md:col-span-2" : "",
                    "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
                  )}
                >
                  {/* Left border indicator */}
                  <div className={cn("absolute left-0 top-0 bottom-0 w-1", getUsageColor(audio.usageCount))} />
                  
                  <div className="flex flex-col h-full">
                    {/* Top section: Icon + Title */}
                    <div className="flex items-start justify-between gap-3 p-4 pb-3">
                      <div className={cn(
                        "p-3 rounded-lg border text-gray-600 group-hover:shadow-sm transition-all flex-shrink-0",
                        categoryColor[audio.category as keyof typeof categoryColor] || "bg-gray-50 border-gray-100"
                      )}>
                        <FileAudio size={20} />
                      </div>
                      <button className="text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    {/* Middle section: Title + Category */}
                    <div className="px-4 pb-3">
                      <h3 className="text-sm font-medium text-gray-900 truncate" title={audio.title}>{audio.title}</h3>
                      <p className={cn(
                        "text-xs font-medium mt-1 inline-block px-2 py-0.5 rounded border",
                        categoryColor[audio.category as keyof typeof categoryColor] || "bg-gray-50 text-gray-600 border-gray-100"
                      )}>
                        {audio.category}
                      </p>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100" />

                    {/* Bottom section: Usage + Metadata */}
                    <div className="px-4 py-3 space-y-2">
                      {/* Usage status */}
                      <div className="flex items-center gap-1.5 text-xs">
                        <Activity size={12} className="text-gray-400" />
                        <span className="text-gray-600 font-medium">{getUsageLabel(audio.usageCount)}</span>
                      </div>

                      {/* Metadata strip */}
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="font-medium text-gray-700">{audio.duration}</span>
                        <span>•</span>
                        <span>{audio.spacesCount} {audio.spacesCount === 1 ? "space" : "spaces"}</span>
                        {audio.isScheduled && (
                          <>
                            <span>•</span>
                            <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                              <RadioTower size={10} />
                              Scheduled
                            </span>
                          </>
                        )}
                      </div>

                      {/* Last played */}
                      {audio.lastPlayed && (
                        <div className="text-xs text-gray-500 flex items-center gap-1.5">
                          <Clock size={11} className="text-gray-400" />
                          <span>Last played {audio.lastPlayed}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredLibrary.map((audio) => (
                <div
                  key={audio.id}
                  className={cn(
                    "flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-gray-300 transition-all duration-150 cursor-pointer group",
                    "relative"
                  )}
                >
                  {/* Left border */}
                  <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", getUsageColor(audio.usageCount))} />
                  
                  {/* Left block: Icon + Title + Category */}
                  <div className="flex items-center gap-3 min-w-0 flex-1 pl-1">
                    <div className={cn(
                      "p-2 rounded-lg border flex-shrink-0",
                      categoryColor[audio.category as keyof typeof categoryColor] || "bg-gray-50 border-gray-100"
                    )}>
                      <FileAudio size={16} className="text-gray-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-gray-900 truncate" title={audio.title}>{audio.title}</div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-medium text-gray-600">{audio.category}</span>
                        <span>•</span>
                        <span>{getUsageLabel(audio.usageCount)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right block: Metadata + Actions */}
                  <div className="flex items-center gap-3 text-xs text-gray-600 flex-shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-gray-700">{audio.duration}</span>
                      <span className="text-gray-400">•</span>
                      <span>{audio.spacesCount} {audio.spacesCount === 1 ? "space" : "spaces"}</span>
                      {audio.isScheduled && (
                        <>
                          <span className="text-gray-400">•</span>
                          <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                            <RadioTower size={10} />
                            Scheduled
                          </span>
                        </>
                      )}
                    </div>
                    <button className="text-gray-400 hover:text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
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
