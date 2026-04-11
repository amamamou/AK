import React from "react";
import { TrendingUp } from "lucide-react";
import { cn } from "../../../utils/cn";

export interface QuickStat {
	label: string;
	value: string;
	icon: React.ElementType;
	trend: string;
}

export default function QuickStatsGrid({ stats }: { stats: QuickStat[] }) {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
			{stats.map((stat, i) => (
				<div
						key={i}
						className="rounded-lg border border-gray-200 bg-white px-5 py-4 hover:border-gray-300 transition-colors"
				>
					<div className="flex items-start justify-between gap-3 mb-3">
						<div className="flex items-center gap-3 min-w-0">
							<div
								className={cn(
									"inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-100 text-gray-700 shrink-0",
								)}
							>
								<stat.icon size={16} className="text-gray-600" />
							</div>
							<span className="text-xs font-medium text-gray-600 truncate">
								{stat.label}
							</span>
						</div>
						<span className="inline-flex items-center gap-1 text-xs font-medium text-gray-600 shrink-0">
							<TrendingUp size={12} className="text-gray-500" />
							{stat.trend}
						</span>
					</div>
					<div className="text-2xl font-semibold text-gray-900">
						{stat.value}
					</div>
				</div>
			))}
		</div>
	);
}
