import React from "react";
import Link from "next/link";
import { Calendar, Music2, Activity } from "lucide-react";

export default function QuickActions() {
	return (
		<div className="bg-white border border-neutral-200 rounded-md p-6">
			<h2 className="text-base font-medium text-neutral-900 mb-4">Quick Actions</h2>
			<div className="space-y-2">
				<Link 
					href="/"
					className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-md transition-colors group"
				>
					<div className="p-2 bg-neutral-100 border border-neutral-200 rounded-md group-hover:border-neutral-300">
						<Calendar size={18} className="text-neutral-700" />
					</div>
					<span className="text-sm font-medium text-neutral-900">Create Broadcast</span>
				</Link>
				<Link 
					href="/library"
					className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-md transition-colors group"
				>
					<div className="p-2 bg-neutral-100 border border-neutral-200 rounded-md group-hover:border-neutral-300">
						<Music2 size={18} className="text-neutral-700" />
					</div>
					<span className="text-sm font-medium text-neutral-900">Upload Audio</span>
				</Link>
				<Link 
					href="/analytics"
					className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-md transition-colors group"
				>
					<div className="p-2 bg-neutral-100 border border-neutral-200 rounded-md group-hover:border-neutral-300">
						<Activity size={18} className="text-neutral-700" />
					</div>
					<span className="text-sm font-medium text-neutral-900">View Analytics</span>
				</Link>
			</div>
		</div>
	);
}
