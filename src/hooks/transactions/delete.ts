import { deleteTransaction } from "@/app/services/transactionsService/delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTransaction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteTransaction,
		onSuccess: () => {
			toast.success("transacao excluida com sucesso");
			queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
			queryClient.invalidateQueries({ queryKey: ["transaction"] });
		},

		onError: () => {
			toast.error("Não foi possivel deletar a transacao");
		},
	});
};
