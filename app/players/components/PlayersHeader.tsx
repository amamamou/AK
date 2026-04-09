"use client";
import React from "react";
import { Plus } from "lucide-react";
import ViewToggle from "./ViewToggle";

export default function PlayersHeader({
  view,
  onToggleView,
  onAdd,
}: {
  view: "list" | "grid";
  onToggleView: (v: "list" | "grid") => void;
  onAdd: () => void;
}) {
  return (
    <div className="bg-white">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            
            {/* Left */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Players
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage connected audio devices by location
              </p>
            </div>

            {/* Right: Controls */}
            <div className="flex items-center gap-3 shrink-0">
              <ViewToggle view={view} onChange={onToggleView} />

              <button
                type="button"
                onClick={onAdd}
                className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <Plus size={14} />
                <span>Add player</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}