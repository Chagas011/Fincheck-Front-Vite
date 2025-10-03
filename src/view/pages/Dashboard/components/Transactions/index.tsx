import { FilterIcon } from "@/components/icons/FilterIcon";
import { TransactionsIcon } from "@/components/icons/TransactionsIcon";
import { Button } from "@/components/ui/button";
import { CircleChevronDownIcon } from "lucide-react";
import { Food } from "@/components/icons/categories/expense/Food";
import { TransactionCard } from "./TransactionsCard";
import { SwiperController } from "./SwiperController";
import { Income } from "@/components/icons/categories/income/Income";

export function Transactions() {
	return (
		<div className="rounded-2xl bg-gray-100 h-full w-full lg:p-10 px-4 py-8 flex flex-col">
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

			<div className="flex-1 mt-6 overflow-y-auto flex flex-col space-y-2">
				<TransactionCard
					transaction="EXPENSE"
					icon={<Food />}
					name="Almoço"
					date="25/06/2025"
					price={123}
				/>
				<TransactionCard
					transaction="INCOME"
					icon={<Income />}
					name="Salário"
					date="01/10/2025"
					price={8000}
				/>
			</div>
		</div>
	);
}
