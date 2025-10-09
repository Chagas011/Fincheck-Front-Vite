import { Trash2 } from "lucide-react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
	DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDeleteBankAccount } from "@/hooks/bankAccounts/delete";
interface DeleteAccountModalProps {
	id: string;
	onSuccess?: () => void;
}

export function DeleteAccountModal({ id, onSuccess }: DeleteAccountModalProps) {
	const { mutate } = useDeleteBankAccount();
	const handleSubmit = () => {
		mutate(id, {
			onSuccess: () => {
				onSuccess?.();
			},
		});
	};
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={"outline"} className="bg-transparent hover:bg-red-3">
					<Trash2 className="text-red-8" />
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-sm h-[484px]">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold text-center">
						Excluir
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col items-center justify-center">
					<Trash2 className="h-6 w-6 text-red-700 mb-5" />
					<p>Tem certeza que deseja</p>
					<p>Excluir esta conta ?</p>
				</div>

				<DialogDescription className="flex flex-col  justify-center items-center">
					<p>Ao excluir essa conta, tambem serao excluidos todos</p>
					<p>os registros de receita e despesas relacionados.</p>
				</DialogDescription>
				<DialogFooter className="flex flex-col">
					<div className="flex flex-col w-full gap-2">
						<DialogClose asChild>
							<Button
								className="w-full bg-red-700 hover:bg-red-600 text-white h-[44px]"
								onClick={handleSubmit}
							>
								Sim, desejo excluir
							</Button>
						</DialogClose>

						<DialogClose asChild>
							<Button
								variant={"outline"}
								className="w-full h-[44px] bg-transparent hover:bg-muted/50 text-black"
							>
								Cancelar
							</Button>
						</DialogClose>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
