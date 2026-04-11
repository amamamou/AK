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
		<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
			{stats.map((stat, i) => (
				<div
						key={i}
						className="rounded-md border border-neutral-200 bg-white px-6 py-5 hover:border-neutral-300 transition-colors"
				>
					<div className="flex items-start justify-between gap-4 mb-4">
						<div className="flex items-center gap-3 min-w-0">
							<div
								className={cn(
									"inline-flex h-8 w-8 items-center justify-center rounded-md bg-neutral-100 text-neutral-700 shrink-0",
								)}
							>
								<stat.icon size={16} className="text-neutral-600" />
							</div>
							<span className="text-xs font-medium text-neutral-600 truncate uppercase tracking-wide">
								{stat.label}
							</span>
						</div>
						<span className="inline-flex items-center gap-1 text-xs font-medium text-neutral-600 shrink-0">
							<TrendingUp size={12} className="text-neutral-500" />
							{stat.trend}
						</span>
					</div>
					<div className="text-2xl font-light text-neutral-900">
						{stat.value}
					</div>
				</div>
			))}
		</div>
	);
}
