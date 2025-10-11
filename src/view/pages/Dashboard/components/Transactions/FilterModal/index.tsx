import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FilterIcon } from "@/components/icons/FilterIcon";
import { Button } from "@/components/ui/button";
import { SwiperControllerYear } from "../SwiperControllerYear";
import { useGetBankAccounts } from "@/hooks/bankAccounts/get";
import { useState } from "react";

interface FilterModalProps {
	onChangeYear: (year: number) => void;
	onChangeBankAccountId: (bankAccountId: string | undefined) => void;
	currentYear: number;
	currentBankAccountId?: string;
}

export function FilterModal({
	onChangeYear,
	onChangeBankAccountId,
	currentYear,
	currentBankAccountId,
}: FilterModalProps) {
	const { data } = useGetBankAccounts();
	const accounts = data ?? [];

	// estados temporários dentro do modal
	const [tempYear, setTempYear] = useState(currentYear);
	const [tempBankAccountId, setTempBankAccountId] = useState<
		string | undefined
	>(currentBankAccountId);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-teal-9 hover:bg-teal-7">
					<FilterIcon />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-sm w-full p-4">
				<DialogHeader>
					<DialogTitle className="text-center">Filtros</DialogTitle>
				</DialogHeader>

				<div className="flex flex-col gap-4">
					<h2 className="text-lg font-bold">Conta</h2>
					{accounts.map((account) => (
						<Button
							key={account.id}
							onClick={() => setTempBankAccountId(account.id)}
							className={`flex justify-start w-full h-[40px] bg-transparent hover:bg-gray-1 text-black ${
								tempBankAccountId === account.id ? "bg-gray-2" : ""
							}`}
						>
							{account.name}
						</Button>
					))}
					<Button
						onClick={() => setTempBankAccountId(undefined)}
						className="flex justify-center w-[200px] h-[40px] bg-transparent hover:bg-teal-8 text-black"
					>
						Limpar Filtro
					</Button>
				</div>

				<div className="flex flex-col mt-4">
					<h2 className="text-lg font-bold">Ano</h2>
					<SwiperControllerYear onChangeYear={setTempYear} year={tempYear} />
				</div>

				<DialogFooter className="mt-5">
					<DialogClose asChild>
						<Button
							className="w-[355px] sm:w-full h-[54px] bg-teal-9 hover:bg-teal-8 rounded-2xl"
							onClick={() => {
								// só aqui aplicamos os filtros de verdade
								onChangeYear(tempYear);
								onChangeBankAccountId(tempBankAccountId);
							}}
						>
							Aplicar Filtros
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
