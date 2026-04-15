"use client";

import React, { useState } from "react";
import { MoreVertical, Clock, RadioTower, Activity, FileAudio } from "lucide-react";
import { cn } from "@/utils/cn";
import { AudioItem } from "./AudioTile";

const categoryColor = {
  Yoga: "bg-purple-50 text-purple-700 border-purple-100",
  Meditation: "bg-blue-50 text-blue-700 border-blue-100",
  Lobby: "bg-amber-50 text-amber-700 border-amber-100",
  Retail: "bg-orange-50 text-orange-700 border-orange-100",
};

function getUsageColor(usageCount: number) {
  if (usageCount > 15) return "border-l-emerald-500";
  if (usageCount > 8) return "border-l-blue-500";
  return "border-l-gray-300";
}

function getUsageLabel(usageCount: number) {
  if (usageCount > 15) return "Frequently used";
  if (usageCount > 8) return "Regularly used";
  if (usageCount > 0) return "Occasionally used";
  return "Never used";
}

function AudioListRow({
  audio,
  onAction,
}: {
  audio: AudioItem;
  onAction?: (action: "play" | "edit" | "delete" | "addToPlaylist", audioId: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:shadow-md hover:border-gray-300 transition-all duration-150 cursor-pointer group relative"
      )}
    >
      {/* Left border */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-lg", getUsageColor(audio.usageCount))} />

      {/* Left block: Icon + Title + Category */}
      <div className="flex items-center gap-3 min-w-0 flex-1 pl-1">
        <div
          className={cn(
            "p-2 rounded-lg border flex-shrink-0",
            categoryColor[audio.category as keyof typeof categoryColor] || "bg-gray-50 border-gray-100"
          )}
        >
          <FileAudio size={16} className="text-gray-600" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium text-gray-900 truncate" title={audio.title}>
            {audio.title}
          </div>
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
          <span>
            {audio.spacesCount} {audio.spacesCount === 1 ? "space" : "spaces"}
          </span>
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
                  onAction?.("play", audio.id);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Play
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onAction?.("addToPlaylist", audio.id);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Add to Playlist
              </button>
              <div className="h-px bg-gray-100" />
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onAction?.("edit", audio.id);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onAction?.("delete", audio.id);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AudioList({
  items,
  onAudioAction,
}: {
  items: AudioItem[];
  onAudioAction?: (action: "play" | "edit" | "delete" | "addToPlaylist", audioId: string) => void;
}) {
  return (
    <div className="space-y-2">
      {items.map((audio) => (
        <AudioListRow key={audio.id} audio={audio} onAction={onAudioAction} />
      ))}
    </div>
  );
}
