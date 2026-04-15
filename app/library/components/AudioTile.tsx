"use client";

import React, { useState } from "react";
import { FileAudio, MoreVertical, Clock, RadioTower, Activity } from "lucide-react";
import { cn } from "@/utils/cn";

export type AudioItem = {
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

export default function AudioTile({
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
        "group relative rounded-lg border transition-all duration-150 cursor-pointer overflow-hidden",
        "bg-white border-gray-200 hover:shadow-md hover:border-gray-300"
      )}
    >
      {/* Left border indicator */}
      <div className={cn("absolute left-0 top-0 bottom-0 w-1", getUsageColor(audio.usageCount))} />

      <div className="flex flex-col h-full">
        {/* Top section: Icon + Title */}
        <div className="flex items-start justify-between gap-3 p-4 pb-3">
          <div
            className={cn(
              "p-3 rounded-lg border text-gray-600 group-hover:shadow-sm transition-all flex-shrink-0",
              categoryColor[audio.category as keyof typeof categoryColor] || "bg-gray-50 border-gray-100"
            )}
          >
            <FileAudio size={20} />
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

        {/* Middle section: Title + Category */}
        <div className="px-4 pb-3">
          <h3 className="text-sm font-medium text-gray-900 truncate" title={audio.title}>
            {audio.title}
          </h3>
          <p
            className={cn(
              "text-xs font-medium mt-1 inline-block px-2 py-0.5 rounded border",
              categoryColor[audio.category as keyof typeof categoryColor] || "bg-gray-50 text-gray-600 border-gray-100"
            )}
          >
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
            <span>
              {audio.spacesCount} {audio.spacesCount === 1 ? "space" : "spaces"}
            </span>
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
  );
}
