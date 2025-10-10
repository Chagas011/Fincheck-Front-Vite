import { Button } from "@/components/ui/button";
import {
	BanknoteArrowDown,
	BanknoteArrowUp,
	CircleChevronDownIcon,
} from "lucide-react";
import { TransactionCard } from "./TransactionsCard";
import { SwiperController } from "./SwiperController";
import { TransactionIcon } from "@shopify/polaris-icons";
import emptyState from "@/assets/EmptyState.svg";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterModal } from "./FilterModal";
import { useGetTransactions } from "@/hooks/transactions/get";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { NewUpdateTransactionModal } from "./UpdateModalTransaction";

export function Transactions() {
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [year, setYear] = useState(new Date().getFullYear());
	const [type, setType] = useState<"INCOME" | "EXPENSE" | undefined>(undefined);
	const [bankAccountId, setBankAccountId] = useState<string | undefined>(
		undefined
	);
	const { data } = useGetTransactions({ month, year, type, bankAccountId });
	const [transactionTitle, setTransactionTile] = useState("Transações");
	const transactions = data ?? [];

	return (
		<div className="rounded-2xl bg-gray-100 h-full w-full lg:p-10 px-4 py-8 flex flex-col">
			<header>
				<div className="flex justify-between items-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="bg-teal-9 hover:bg-teal-7">
								<TransactionIcon className=" fill-white !w-5 !h-5" />

								<span className="font-medium">{transactionTitle}</span>
								<CircleChevronDownIcon className="!w-5 !h-5" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="px-2 w-[279px] h-[176px] flex flex-col justify-around"
							align="start"
						>
							<DropdownMenuItem>
								<Button
									className="flex gap-2 justify-start w-full bg-transparent hover:bg-gray-1 text-black"
									onClick={() => {
										setType("INCOME");
										setTransactionTile("Receitas");
									}}
								>
									<BanknoteArrowUp className="!w-5 !h-5 text-teal-7" />
									<span className="text-sm">Receitas</span>
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Button
									className="flex justify-start gap-2 w-full bg-transparent text-black hover:bg-gray-1"
									onClick={() => {
										setType("EXPENSE");
										setTransactionTile("Despesas");
									}}
								>
									<BanknoteArrowDown className="!w-5 !h-5 text-red-7" />
									<span className="text-sm">Despesas</span>
								</Button>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Button
									className="flex justify-start gap-2 w-full bg-transparent hover:bg-gray-1 text-black"
									onClick={() => {
										setType(undefined);
										setTransactionTile("Transações");
									}}
								>
									<TransactionIcon className="!w-5 !h-5 fill-blue-7" />
									<span className="text-sm">Transações</span>
								</Button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<FilterModal
						onChangeYear={setYear}
						onChangeBankAccountId={setBankAccountId}
					/>
				</div>
			</header>

			<div className="mt-6">
				<SwiperController onChangeMonth={setMonth} />
			</div>

			{transactions.length > 0 ? (
				<>
					<div className="flex-1 mt-6 overflow-y-auto flex flex-col space-y-2">
						{transactions.map((transaction) => (
							<NewUpdateTransactionModal
								id={transaction.id}
								bankAccountId={transaction.bankAccountId}
								categoryId={transaction.category?.id}
								date={transaction.date}
								name={transaction.name}
								type={transaction.type}
								value={String(transaction.value)}
								key={transaction.id}
							>
								<TransactionCard
									transaction={transaction.type}
									category={transaction.category}
									name={transaction.name}
									date={format(new Date(transaction.date), "dd/MM,yyyy", {
										locale: ptBR,
									})}
									price={transaction.value}
								/>
							</NewUpdateTransactionModal>
						))}
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
