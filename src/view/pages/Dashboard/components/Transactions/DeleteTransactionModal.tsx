import { Trash2 } from "lucide-react";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useDeleteTransaction } from "@/hooks/transactions/delete";
interface DeleteTransactionModalProps {
	id: string;
	onSuccess?: () => void;
}

export function DeleteTransactionModal({
	id,
	onSuccess,
}: DeleteTransactionModalProps) {
	const { mutate } = useDeleteTransaction();
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

			<DialogContent className="max-w-sm h-[520px]">
				<DialogHeader>
					<DialogTitle className="text-lg font-semibold text-center">
						Excluir
					</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col items-center justify-center">
					<Trash2 className="h-6 w-6 text-red-700 mb-5" />
					<p>Tem certeza que deseja</p>
					<p>Excluir esta transacao ?</p>
				</div>

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
