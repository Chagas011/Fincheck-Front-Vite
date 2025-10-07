import { Button } from "@/components/ui/button";
import {
	BanknoteArrowDown,
	BanknoteArrowUp,
	CircleChevronDownIcon,
} from "lucide-react";
import { Food } from "@/components/icons/categories/expense/Food";
import { TransactionCard } from "./TransactionsCard";
import { SwiperController } from "./SwiperController";
import { Income } from "@/components/icons/categories/income/Income";
import { TransactionIcon } from "@shopify/polaris-icons";
import emptyState from "@/assets/EmptyState.svg";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterModal } from "./FilterModal";

export function Transactions() {
	const transactions: number[] = [];
	return (
		<div className="rounded-2xl bg-gray-100 h-full w-full lg:p-10 px-4 py-8 flex flex-col">
			<header>
				<div className="flex justify-between items-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="bg-teal-9 hover:bg-teal-7">
								<TransactionIcon className=" fill-white !w-5 !h-5" />

								<span className="font-medium">Transações</span>
								<CircleChevronDownIcon className="!w-5 !h-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="px-2 w-[279px] h-[176px] flex flex-col justify-around"
							align="start"
						>
							<DropdownMenuItem>
								<Button className="flex gap-2 justify-start w-full bg-transparent hover:bg-gray-1 text-black">
									<BanknoteArrowUp className="!w-5 !h-5 text-teal-7" />
									<span className="text-sm">Receitas</span>
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Button className="flex justify-start gap-2 w-full bg-transparent text-black hover:bg-gray-1">
									<BanknoteArrowDown className="!w-5 !h-5 text-red-7" />
									<span className="text-sm">Despesas</span>
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Button className="flex justify-start gap-2 w-full bg-transparent hover:bg-gray-1 text-black">
									<TransactionIcon className="!w-5 !h-5 fill-blue-7" />
									<span className="text-sm">Transacoes</span>
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<FilterModal />
				</div>
			</header>

			<div className="mt-6">
				<SwiperController />
			</div>

			{transactions.length > 0 ? (
				<>
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
				</>
			) : (
				<>
					<div className="flex flex-col justify-center items-center w-full h-full">
						<img src={emptyState} alt="emptyState" />
						<p className="text-lg">Não encontramos nenhuma transação!</p>
					</div>
				</>
			)}
		</div>
	);
}
