import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

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
import { NumericFormat } from "react-number-format";
import { ColorIcon } from "@/components/icons/ColorIcon";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { COLORS } from "@/app/config/constants";
import { useCreateBankAccount } from "@/hooks/bankAccounts/create";
import { numericValue } from "@/lib/formatCurrence";
import { useGetBankAccounts } from "@/hooks/bankAccounts/get";
import { useEffect, useState } from "react";
import { useUpdateBankAccount } from "@/hooks/bankAccounts/update";

import { DeleteAccountModal } from "./Accounts/DeleteAccountModal";

interface NewAccountModalProps {
	children: React.ReactNode;
	id?: string;
	title: string;
}

export function NewAccountModal({ children, id, title }: NewAccountModalProps) {
	const form = useForm<NewAccountSchema>({
		resolver: zodResolver(newAccountSchema),
		defaultValues: {
			name: "",
			initialBalance: "",
			color: "",
			type: "CASH",
		},
		mode: "onChange",
	});

	const [open, setOpen] = useState(false);
	const { mutate } = useCreateBankAccount();
	const { mutate: update } = useUpdateBankAccount();
	const { data: accounts } = useGetBankAccounts();
	useEffect(() => {
		if (id && accounts) {
			const account = accounts.find((acc) => acc.id === id);
			if (account) {
				form.reset({
					name: account.name,
					initialBalance: String(account.currentBalance),
					color: account.color,
					type: account.type,
				});
			}
		}
	}, [id, accounts, form]);

	const handleSubmit = form.handleSubmit(
		({ color, initialBalance, name, type }) => {
			const payload = {
				color,
				initialBalance: numericValue(initialBalance),
				name,
				type,
			};
			if (id) {
				update(
					{
						id,
						data: {
							color,
							initialBalance: numericValue(initialBalance),
							name,
							type,
						},
					},
					{
						onSuccess: () => {
							form.reset({
								name: "",
								color: "",
								initialBalance: "",
								type: "CASH",
							});
							setOpen(false);
						},
					}
				);
			} else {
				mutate(payload, {
					onSuccess: () => {
						form.reset({
							name: "",
							color: "",
							initialBalance: "",
							type: "CASH",
						});
					},
				});
			}
		}
	);
	return (
		<div className="w-full">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{children}</DialogTrigger>
				<DialogContent className="max-w-sm w-ful p-4">
					<DialogHeader>
						{id && (
							<div>
								<DeleteAccountModal id={id} onSuccess={() => setOpen(false)} />
							</div>
						)}
						<DialogTitle className="text-center">{title}</DialogTitle>
					</DialogHeader>
					<Form {...form}>
						<form onSubmit={handleSubmit} className="space-y-4 mt-10">
							<FormField
								control={form.control}
								name="initialBalance"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<NumericFormat
												{...field}
												thousandSeparator="."
												decimalSeparator=","
												prefix="R$ "
												decimalScale={2}
												fixedDecimalScale
												allowNegative={false}
												customInput={Input}
												onValueChange={(values) =>
													field.onChange(values.floatValue)
												}
												placeholder="R$ 0,0"
												className="h-[52px] text-center border-none font-bold text-2xl"
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

							<FormField
								control={form.control}
								name="color"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<div className="relative w-full">
														<Input
															placeholder="Escolha a cor"
															readOnly
															className="h-[52px] pr-12 cursor-pointer"
														/>

														<div className="absolute right-3 top-1/2 -translate-y-1/2">
															<ColorIcon
																bg={
																	COLORS.find((c) => c.bg === field.value)
																		?.bg || "#e5e7eb"
																}
																color={
																	COLORS.find((c) => c.bg === field.value)
																		?.color || "#374151"
																}
															/>
														</div>
													</div>
												</DropdownMenuTrigger>

												<DropdownMenuContent className="grid grid-cols-4 gap-4 h-[256px] p-3 w-[352px]">
													{COLORS.map((color) => (
														<DropdownMenuItem
															key={color.bg}
															onClick={() => field.onChange(color.bg)}
															className="p-0 hover:bg-transparent focus:bg-transparent cursor-pointer mx-auto"
														>
															<ColorIcon bg={color.bg} color={color.color} />
														</DropdownMenuItem>
													))}
												</DropdownMenuContent>
											</DropdownMenu>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<DialogClose asChild>
								<Button
									type="submit"
									disabled={!form.formState.isValid}
									className="w-[355px] sm:w-full h-[54px] bg-teal-9 hover:bg-teal-8 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
								>
									Salvar
								</Button>
							</DialogClose>
						</form>
					</Form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
