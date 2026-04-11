import React from "react";
import DashboardHeader from "./components/DashboardHeader";
import LivePlayerStatus from "./components/LivePlayerStatus";
import RecentActivityFeed from "./components/RecentActivityFeed";
import UpcomingBroadcasts from "./components/UpcomingBroadcasts";
import QuickActions from "./components/QuickActions";
import { upcomingBroadcasts, recentActivity, quickStats, playerStatus } from "./mockData";

export const metadata = {
	title: "Dashboard",
};

export default function DashboardPage() {
	return (
		<div className="flex-1 overflow-auto bg-neutral-50">
			<DashboardHeader stats={quickStats} />

			<div className="p-10">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
					{/* Left Column - 2/3 width */}
					<div className="lg:col-span-2 space-y-10">
						<LivePlayerStatus players={playerStatus} />
						<RecentActivityFeed activities={recentActivity} />
					</div>

					{/* Right Column - 1/3 width */}
					<div className="space-y-10">
						<UpcomingBroadcasts broadcasts={upcomingBroadcasts} />
						<QuickActions />
					</div>
				</div>
			</div>
		</div>
	);
}
