import React from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import QuickStatsGrid, { QuickStat } from "./QuickStatsGrid";

export default function DashboardHeader({ stats }: { stats: QuickStat[] }) {
	return (
		<div className="sticky top-0 z-10 bg-white border-b border-gray-200">
			<div className="px-8 py-7">
				<div className="flex items-start justify-between gap-6 mb-6">
					<div className="flex flex-col gap-2 min-w-0">
						<h1 className="text-3xl font-semibold text-gray-900">
							Dashboard
						</h1>
						<p className="text-sm text-gray-600 max-w-2xl">
							Monitor your players, broadcasts, and scheduling in real-time.
						</p>
					</div>

					<Link
							aria-label="Open schedule"
							href="/schedule"
							className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
					>
						<CalendarDays size={16} className="text-gray-600" />
						<span>View schedule</span>
					</Link>
				</div>

				<QuickStatsGrid stats={stats} />
			</div>
		</div>
	);
}
