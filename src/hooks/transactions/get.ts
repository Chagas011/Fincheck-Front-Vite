import { get } from "@/app/services/transactionsService/get";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface GetTransactionsParams {
	month: number;
	year: number;
	bankAccountId?: string;
	type?: "INCOME" | "EXPENSE" | undefined;
}

export const useGetTransactions = ({
	month,
	year,
	bankAccountId,
	type,
}: GetTransactionsParams) => {
	return useQuery({
		queryKey: ["transaction", { month, year, bankAccountId, type }],
		queryFn: async () => {
			try {
				const data = await get({
					month,
					year,
					bankAccountId: bankAccountId ?? undefined,
					type: type ?? undefined,
				});
				return data ?? [];
			} catch {
				toast.error("Erro ao acessar Transacoes");
				return [];
			}
		},
		retry: false,
		refetchOnWindowFocus: false,
	});
};
