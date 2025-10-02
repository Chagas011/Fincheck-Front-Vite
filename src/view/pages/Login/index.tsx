import { Button } from "@/components/ui/button";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "./schema";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks/useLogin";

export function Login() {
	const form = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const { mutate } = useLogin();

	const handleSubmit = form.handleSubmit(({ email, password }) => {
		mutate({ email, password });
	});
	return (
		<div className="flex flex-col justify-center ">
			<div>
				<h1 className="text-center font-bold text-2xl">Entre em sua conta</h1>
				<p className="text-center font-normal ">
					Novo por aqui?{" "}
					<span>
						{" "}
						<Link to="/register" className="text-teal-9 font-medium">
							Crie uma conta
						</Link>{" "}
					</span>
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={handleSubmit} className="space-y-4 mt-10">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Email"
										{...field}
										type="email"
										className="h-[52px]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										placeholder="Senha"
										{...field}
										type="password"
										className="h-[52px]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="h-[54px] w-full bg-teal-9 hover:bg-teal-7 rounded-2xl"
					>
						Entrar
					</Button>
				</form>
			</Form>
		</div>
	);
}
