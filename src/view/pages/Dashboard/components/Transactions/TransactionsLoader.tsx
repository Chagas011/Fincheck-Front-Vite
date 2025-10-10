import { Skeleton } from "@/components/ui/skeleton";

export function TransactionsLoader() {
	return (
		<div className="rounded-2xl bg-gray-100 h-full w-full lg:p-10 px-4 py-8 flex flex-col animate-in fade-in duration-300">
			{/* Header skeleton */}
			<div className="flex justify-between items-center">
				<Skeleton className="h-10 w-[160px] rounded-lg" />
				<Skeleton className="h-10 w-[120px] rounded-lg" />
			</div>

			{/* SwiperController placeholder */}
			<div className="mt-6 flex justify-center gap-3">
				<Skeleton className="h-8 w-8 rounded-full" />
				<Skeleton className="h-8 w-24 rounded-md" />
				<Skeleton className="h-8 w-8 rounded-full" />
			</div>

			{/* Transactions list */}
			<div className="flex-1 mt-8 space-y-3 overflow-y-auto">
				{Array.from({ length: 5 }).map((_, i) => (
					<div
						key={i}
						className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
					>
						<div className="flex items-center gap-3">
							<Skeleton className="h-10 w-10 rounded-full" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-[140px]" />
								<Skeleton className="h-3 w-[100px]" />
							</div>
						</div>

						<div className="text-right space-y-2">
							<Skeleton className="h-4 w-[70px]" />
							<Skeleton className="h-3 w-[50px]" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
