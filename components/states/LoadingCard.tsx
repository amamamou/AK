export default function LoadingCard() {
	return (
		<div className="bg-white border border-neutral-200 rounded-md p-6">
			<div className="space-y-4">
				<div className="h-6 bg-neutral-200 rounded-md w-1/3 animate-pulse" />
				<div className="space-y-3">
					<div className="h-4 bg-neutral-100 rounded-md w-full animate-pulse" />
					<div className="h-4 bg-neutral-100 rounded-md w-5/6 animate-pulse" />
					<div className="h-4 bg-neutral-100 rounded-md w-4/6 animate-pulse" />
				</div>
			</div>
		</div>
	);
}
