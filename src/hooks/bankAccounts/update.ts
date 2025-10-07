import { update } from "@/app/services/bankAccountService/update";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
interface BankAccountParams {
	name: string;
	initialBalance: number;
	color: string;
	type: "CHECKING" | "INVESTMENT" | "CASH";
}
export const useUpdateBankAccount = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: BankAccountParams }) =>
			update(id, data),
		onSuccess: () => {
			toast.success("Conta atualizada com sucesso!");
			queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
		},

		onError: () => {
			toast.error("Não foi possivel atualizar a conta");
		},
	});
};
