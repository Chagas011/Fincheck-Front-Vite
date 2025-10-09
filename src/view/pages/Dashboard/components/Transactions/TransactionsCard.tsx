import { CategoryIcon } from "@/components/icons/categories/CategoryIcon";
import { formatCurrency } from "@/lib/formatCurrence";
import { cn } from "@/lib/utils";
import { useBalanceStore } from "@/store/balance";

interface TransactionCardProps {
	transaction: "INCOME" | "EXPENSE";
	category?: {
		icon: string;
	};
	name: string;
	date: string;
	price: number;
}

export function TransactionCard({
	transaction,
	category,
	name,
	date,
	price,
}: TransactionCardProps) {
	const { showBalance } = useBalanceStore();

	return (
		<div className="flex flex-col gap-4 bg-white rounded-2xl p-3">
			<div className="flex justify-between items-center ">
				<div className="flex gap-4 items-center">
					<CategoryIcon
						type={transaction === "EXPENSE" ? "expense" : "income"}
						category={category?.icon}
					/>
					<div className="flex flex-col">
						<strong className="text-lg text-gray-8">{name}</strong>
						<span className="text-sm text-gray-6">{date}</span>
					</div>
				</div>
				<div>
					{transaction === "EXPENSE" && (
						<span
							className={cn(
								"font-medium text-lg text-red-8",
								!showBalance && "blur-sm"
							)}
						>
							-{formatCurrency(price)}
						</span>
					)}
					{transaction === "INCOME" && (
						<span
							className={cn(
								"font-medium text-lg text-green-8",
								!showBalance && "blur-sm"
							)}
						>
							+{formatCurrency(price)}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}
