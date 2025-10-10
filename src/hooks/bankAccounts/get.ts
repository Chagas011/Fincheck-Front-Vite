import { get } from "@/app/services/bankAccountService/get";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetBankAccounts = () => {
	return useQuery({
		queryKey: ["bankAccounts"],
		queryFn: async () => {
			try {
				const data = await get();
				return data;
			} catch {
				toast.error("Erro ao acessar contas");
				return [];
			}
		},
		retry: false,
		refetchOnWindowFocus: false,
	});
};
