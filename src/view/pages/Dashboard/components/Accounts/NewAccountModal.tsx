import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	BankAccountType,
	newAccountSchema,
	type NewAccountSchema,
} from "./schema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function NewAccountModal() {
	const form = useForm<NewAccountSchema>({
		resolver: zodResolver(newAccountSchema),
		defaultValues: {
			name: "",
			initialBalance: 0,
			color: "",
			type: "CASH",
		},
		mode: "onChange",
	});
	const handleSubmit = form.handleSubmit(
		({ color, initialBalance, name, type }) => {
			console.log({ color, initialBalance, name, type });
		}
	);
	return (
		<div className="w-full">
			<Dialog>
				<DialogTrigger asChild>
					<Button className="flex gap-3 flex-col  bg-teal-9 hover:bg-teal-6 w-full h-[204px] border-2 border-dashed border-teal-4 ">
						<PlusCircleIcon className="!w-8 !h-8" />

						<span className="font-medium tracking-[-0.5px] ">
							Cadastre uma
							<span className="block">nova Conta</span>
						</span>
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-sm w-ful p-4">
					<DialogHeader>
						<DialogTitle className="text-center">Filtros</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={handleSubmit} className="space-y-4 mt-10">
							<FormField
								control={form.control}
								name="initialBalance"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="R$"
												{...field}
												type="number"
												className="h-[52px]"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												placeholder="Nome da Conta"
												{...field}
												type="text"
												className="h-[52px]"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<SelectTrigger className="w-full py-5">
													<SelectValue placeholder="Tipo" />
												</SelectTrigger>
												<SelectContent className="w-full min-w-full">
													{Object.entries(BankAccountType).map(
														([key, label]) => (
															<SelectItem
																key={key}
																value={key}
																className="h-12 px-4"
															>
																{label}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
					<DialogFooter className=" mt-5">
						<DialogClose asChild>
							<Button className="w-[355px] sm:w-full h-[54px] bg-teal-9 hover:bg-teal-8 rounded-2xl">
								Aplicar Filtros
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
