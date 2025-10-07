import { create } from "@/app/services/bankAccountService/create";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateBankAccount = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: create,
		onSuccess: () => {
			toast.success("Nova conta criada com sucesso");
			queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
		},

		onError: () => {
			toast.error("Não foi possivel criar a conta");
		},
	});
};
