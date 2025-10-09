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

interface FilterModalProps {
	onChangeYear: (year: number) => void;
	onChangeBankAccountId: (bankAccountId: string | undefined) => void;
}

export function FilterModal({
	onChangeYear,
	onChangeBankAccountId,
}: FilterModalProps) {
	const { data } = useGetBankAccounts();
	const accounts = data ?? [];
	return (
		<div>
			<Dialog>
				<DialogTrigger asChild>
					<Button className="bg-teal-9 hover:bg-teal-7">
						<FilterIcon />
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-sm w-ful p-4">
					<DialogHeader>
						<DialogTitle className="text-center">Filtros</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<h2 className="text-lg font-bold">Conta</h2>
						{accounts.map((account) => (
							<Button
								key={account.id}
								onClick={() => onChangeBankAccountId(account.id)}
								className="flex justify-start w-full h-[40px] bg-transparent hover:bg-gray-1 text-black"
							>
								{account.name}
							</Button>
						))}
						<Button
							onClick={() => onChangeBankAccountId(undefined)}
							className="flex justify-center w-[200px] h-[40px] bg-transparent hover:bg-teal-8 text-black"
						>
							Limpar Filtro - Meses
						</Button>
					</div>

					<div className="flex flex-col">
						<h2 className="text-lg font-bold">Ano</h2>

						<SwiperControllerYear onChangeYear={onChangeYear} />
					</div>
					<DialogFooter className=" mt-5">
						<DialogClose asChild>
							<Button className="w-[355px] sm:w-full h-[54px] bg-teal-9 hover:bg-teal-8 rounded-2xl">
								Aplicar Filtros
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
