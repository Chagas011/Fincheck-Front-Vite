import { register } from "@/app/services/registerAuth";
import { useAuthStore } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useRegister = () => {
	const { setAuth } = useAuthStore();

	return useMutation({
		mutationFn: register,
		onSuccess: ({ access_token }) => {
			if (access_token) {
				setAuth(access_token);
			}
			toast.success("Cadastro realizado com sucesso");
		},

		onError: () => {
			toast.error("Não foi possivel realizar o cadastro");
		},
	});
};
