"use client";

import React from "react";
import { cn } from "@/utils/cn";
import AudioTile, { AudioItem } from "./AudioTile";

export default function AudioGrid({
  items,
  onAudioAction,
}: {
  items: AudioItem[];
  onAudioAction?: (action: "play" | "edit" | "delete" | "addToPlaylist", audioId: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((audio, idx) => (
        <div
          key={audio.id}
          className={cn(
            idx % 5 === 4 ? "md:col-span-2" : "",
          )}
        >
          <AudioTile audio={audio} onAction={onAudioAction} />
        </div>
      ))}
    </div>
  );
}
