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
		<div className="bg-white border border-gray-200 rounded-lg">
			<div className="px-6 py-4 border-b border-gray-200">
				<h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
			</div>
			<div className="divide-y divide-gray-100">
				{activities.map((activity, i) => (
					<div key={i} className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
						<div className={cn(
							"p-2 rounded-lg mt-0.5 shrink-0",
							activity.type === "start" ? "bg-gray-100 text-gray-700" :
							activity.type === "connect" ? "bg-gray-100 text-gray-700" :
							activity.type === "complete" ? "bg-gray-100 text-gray-700" :
							"bg-gray-100 text-gray-700"
						)}>
							{activity.type === "start" && <PlayCircle size={16} />}
							{activity.type === "connect" && <Speaker size={16} />}
							{activity.type === "complete" && <Clock size={16} />}
							{activity.type === "update" && <Calendar size={16} />}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900">{activity.action}</p>
							<p className="text-sm text-gray-600 truncate">{activity.detail}</p>
						</div>
						<span className="text-xs text-gray-500 whitespace-nowrap shrink-0">{activity.time}</span>
					</div>
				))}
			</div>
		</div>
	);
}
