import { create } from "@/app/services/transactionsService/create";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTransaction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: create,
		onSuccess: () => {
			toast.success("Nova transacao criada com sucesso");
			queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
			queryClient.invalidateQueries({ queryKey: ["transaction"] });
		},

		onError: () => {
			toast.error("Não foi possivel criar a transacao");
		},
	});
};
