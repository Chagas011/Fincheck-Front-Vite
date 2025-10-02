import { FilterIcon } from "@/components/icons/FilterIcon";
import { TransactionsIcon } from "@/components/icons/TransactionsIcon";
import { Button } from "@/components/ui/button";
import { CircleChevronDownIcon } from "lucide-react";

import { TransactionCard } from "./TransactionsCard";
import { SwiperController } from "./SwiperController";

export function Transactions() {
	return (
		<div className="rounded-2xl bg-gray-100 h-full w-full lg:p-10 px-4 py-8">
			<header>
				<div className="flex justify-between items-center">
					<Button className="bg-teal-9 hover:bg-teal-7">
						<TransactionsIcon />
						<span>Transações</span>
						<CircleChevronDownIcon />
					</Button>
					<Button className="bg-teal-9 hover:bg-teal-7">
						<FilterIcon />
					</Button>
				</div>
			</header>
			<div className="mt-6">
				<SwiperController />
			</div>
			<div className="mt-6">
				<TransactionCard />
			</div>
		</div>
	);
}
