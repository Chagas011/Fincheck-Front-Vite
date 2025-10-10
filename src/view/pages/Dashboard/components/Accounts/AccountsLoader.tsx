import { Skeleton } from "@/components/ui/skeleton";

export function AccountsLoader() {
	return (
		<div className="bg-teal-9 w-full h-full flex flex-col rounded-2xl p-6 animate-in fade-in duration-300">
			<div className="flex flex-col gap-3">
				<Skeleton className="h-4 w-24 bg-teal-7/40" />
				<div className="flex items-center gap-3">
					<Skeleton className="h-8 w-40 bg-teal-7/60" />
					<Skeleton className="h-6 w-6 rounded-full bg-teal-7/50" />
				</div>
			</div>

			<div className="flex justify-between items-center mt-10 mb-5">
				<Skeleton className="h-5 w-32 bg-teal-7/40" />
				<div className="flex gap-2">
					<Skeleton className="h-5 w-5 rounded-full bg-teal-7/30" />
					<Skeleton className="h-5 w-5 rounded-full bg-teal-7/30" />
				</div>
			</div>

			{/* Cards de contas (Swiper simulado) */}
			<div className="flex gap-4 overflow-hidden lg:mt-[600px]">
				{Array.from({ length: 2 }).map((_, i) => (
					<div
						key={i}
						className="flex flex-col justify-between bg-teal-10/40 rounded-2xl p-5 w-[300px] h-[180px] backdrop-blur-sm border border-teal-8/50"
					>
						<div className="flex flex-col gap-2">
							<Skeleton className="h-4 w-3/4 bg-teal-6/40" />
							<Skeleton className="h-3 w-1/2 bg-teal-6/30" />
						</div>

						<div className="flex flex-col gap-1">
							<Skeleton className="h-4 w-24 bg-teal-6/50" />
							<Skeleton className="h-6 w-32 bg-teal-6/60" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
