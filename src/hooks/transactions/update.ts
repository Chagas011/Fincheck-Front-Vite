import { update } from "@/app/services/transactionsService/update";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
interface TransactionsParams {
	bankAccountId: string;
	categoryId: string;
	name: string;
	value: number;
	date: Date;
	type: "INCOME" | "EXPENSE";
}
export const useUpdateTransaction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: TransactionsParams }) =>
			update(id, data),
		onSuccess: () => {
			toast.success("Transacao atualizada com sucesso!");
			queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
			queryClient.invalidateQueries({ queryKey: ["transaction"] });
		},

		onError: () => {
			toast.error("Não foi possivel atualizar a transacao");
		},
	});
};
