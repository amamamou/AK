import React from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import QuickStatsGrid, { QuickStat } from "./QuickStatsGrid";

export default function DashboardHeader({ stats }: { stats: QuickStat[] }) {
	return (
		<div className="sticky top-0 z-10 bg-white border-b border-neutral-200">
			<div className="px-10 py-8">
				<div className="flex items-start justify-between gap-8 mb-10">
					<div className="flex flex-col gap-3 min-w-0">
						<h1 className="text-4xl font-light leading-tight text-neutral-900">
							Dashboard
						</h1>
						<p className="text-sm text-neutral-600 max-w-2xl">
							Real-time monitoring of your players, broadcasts, and scheduled content.
						</p>
					</div>

					<Link
							aria-label="Open schedule"
							href="/schedule"
							className="inline-flex items-center gap-2 rounded-md border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-50 transition-colors cursor-pointer shrink-0"
					>
						<CalendarDays size={16} className="text-neutral-600" />
						<span>Schedule</span>
					</Link>
				</div>

				<QuickStatsGrid stats={stats} />
			</div>
		</div>
	);
}
