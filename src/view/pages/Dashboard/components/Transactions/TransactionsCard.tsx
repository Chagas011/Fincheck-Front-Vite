import { Food } from "@/components/icons/categories/expense/Food";
import { formatCurrency } from "@/lib/formatCurrence";

export function TransactionCard() {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<div className="flex gap-4 items-center">
					<Food />
					<div className="flex flex-col">
						<strong className="text-lg text-gray-8">Almoco</strong>
						<span className="text-sm text-gray-6">04/06/2023</span>
					</div>
				</div>
				<div>
					<span className="font-medium text-lg text-red-8">
						-{formatCurrency(123)}
					</span>
				</div>
			</div>
		</div>
	);
}
