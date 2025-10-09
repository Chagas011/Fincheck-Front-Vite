import { get } from "@/app/services/categoryService/get";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			try {
				const data = await get();
				return data;
			} catch {
				toast.error("Erro ao acessar categories");
			}
		},
		retry: false,
		refetchOnWindowFocus: false,
	});
};
