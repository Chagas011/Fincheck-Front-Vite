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
import { registerSchema, type RegisterFormData } from "./schema";
import { Link } from "react-router-dom";
import { useRegister } from "@/hooks/useRegister";
export function Register() {
	const form = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			email: "",
			name: "",
			password: "",
		},
		mode: "onChange",
	});

	const { mutate } = useRegister();

	const handleSubmit = form.handleSubmit(({ name, email, password }) => {
		mutate({ name, email, password });
	});
	return (
		<div className="flex flex-col justify-center ">
			<div>
				<h1 className="text-center font-bold text-2xl">Crie sua conta</h1>
				<p className="text-center font-normal">
					Ja possui uma conta?{" "}
					<span>
						{" "}
						<Link to="/login" className="text-teal-9 font-medium">
							Fazer Login
						</Link>{" "}
					</span>
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={handleSubmit} className="space-y-4 mt-10">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Nome" {...field} className="h-[52px]" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
						Criar Conta
					</Button>
				</form>
			</Form>
		</div>
	);
}
