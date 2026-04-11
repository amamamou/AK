import React from "react";
import { PlayCircle, Speaker, Clock, Calendar } from "lucide-react";
import { cn } from "../../../utils/cn";

export interface ActivityItem {
	time: string;
	action: string;
	detail: string;
	type: string;
}

export default function RecentActivityFeed({ activities }: { activities: ActivityItem[] }) {
	return (
		<div className="bg-white border border-neutral-200 rounded-md">
			<div className="px-6 py-4 border-b border-neutral-200">
				<h2 className="text-base font-medium text-neutral-900">Recent Activity</h2>
			</div>
			<div className="divide-y divide-neutral-100">
				{activities.map((activity, i) => (
					<div key={i} className="px-6 py-4 flex items-start gap-4 hover:bg-neutral-50 transition-colors">
						<div className={cn(
							"p-2 rounded-md mt-0.5 shrink-0",
							activity.type === "start" ? "bg-neutral-100 text-neutral-700" :
							activity.type === "connect" ? "bg-neutral-100 text-neutral-700" :
							activity.type === "complete" ? "bg-neutral-100 text-neutral-700" :
							"bg-neutral-100 text-neutral-700"
						)}>
							{activity.type === "start" && <PlayCircle size={16} />}
							{activity.type === "connect" && <Speaker size={16} />}
							{activity.type === "complete" && <Clock size={16} />}
							{activity.type === "update" && <Calendar size={16} />}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-neutral-900">{activity.action}</p>
							<p className="text-sm text-neutral-600 truncate">{activity.detail}</p>
						</div>
						<span className="text-xs text-neutral-500 whitespace-nowrap shrink-0">{activity.time}</span>
					</div>
				))}
			</div>
		</div>
	);
}
