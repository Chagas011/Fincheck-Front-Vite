import { deleteAccount } from "@/app/services/bankAccountService/delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteBankAccount = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteAccount,
		onSuccess: () => {
			toast.success("conta excluida com sucesso");
			queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
		},

		onError: () => {
			toast.error("Não foi possivel deletar a conta");
		},
	});
};
