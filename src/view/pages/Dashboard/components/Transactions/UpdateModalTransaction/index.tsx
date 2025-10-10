import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
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

import { DatePickerField } from "@/components/DatePicker";
import { numericValue } from "@/lib/formatCurrence";
import { useGetBankAccounts } from "@/hooks/bankAccounts/get";
import { useGetCategories } from "@/hooks/categories/get";

import { useEffect, useState } from "react";
import { updateSchemaType, type UpdateSchemaType } from "./schema";
import { useUpdateTransaction } from "@/hooks/transactions/update";

import { DeleteTransactionModal } from "../DeleteTransactionModal";

interface NewUpdateTransactionModalProps {
	id: string;
	children: React.ReactNode;
	name: string;
	bankAccountId: string;
	categoryId: string | undefined;
	date: Date;
	value: string;
	type: "EXPENSE" | "INCOME";
}

export function NewUpdateTransactionModal({
	children,
	bankAccountId,
	categoryId,
	date,
	name,
	type,
	value,
	id,
}: NewUpdateTransactionModalProps) {
	const form = useForm<UpdateSchemaType>({
		resolver: zodResolver(updateSchemaType),
		defaultValues: {
			name: "",
			bankAccountId: "",
			categoryId: "",
			date: new Date(),
			value: "",
			type: "EXPENSE",
		},
		mode: "onChange",
	});

	useEffect(() => {
		if (id) {
			form.reset({
				name,
				bankAccountId,
				categoryId,
				date: new Date(date),
				value,
				type,
			});
		}
	}, [bankAccountId, categoryId, date, name, type, value, form, id]);

	const { data } = useGetBankAccounts();
	const accounts = data ?? [];
	const { data: category } = useGetCategories();
	const categories =
		category?.filter((categorie) => categorie.type === type) ?? [];

	const { mutate } = useUpdateTransaction();
	const [open, setOpen] = useState(false);
	const handleSubmit = form.handleSubmit(
		({ value, name, categoryId, bankAccountId, date, type }) => {
			mutate(
				{
					id,
					data: {
						value: numericValue(value),
						name,
						categoryId,
						bankAccountId,
						date,
						type,
					},
				},
				{
					onSuccess: () => {
						setOpen(false);
					},
				}
			);
		}
	);
	return (
		<div className="w-full">
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<div className="w-full cursor-pointer">{children}</div>
				</DialogTrigger>
				<DialogContent className="max-w-sm w-ful p-4">
					<DialogHeader>
						<div>
							<DeleteTransactionModal
								id={id}
								onSuccess={() => setOpen(false)}
							/>
						</div>
						<DialogTitle className="flex justify-around">
							{type === "INCOME" ? "Receita" : "Despesa"}
						</DialogTitle>
					</DialogHeader>
					<FormProvider {...form}>
						<form onSubmit={handleSubmit} className="space-y-4 mt-6">
							<FormField
								control={form.control}
								name="value"
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
												placeholder="Nome da Despesa"
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
								name="bankAccountId"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<SelectTrigger className="w-full py-5">
													<SelectValue placeholder="Pagar com" />
												</SelectTrigger>
												<SelectContent
													className="w-full min-w-full"
													side="bottom"
													align="start"
													sideOffset={4}
												>
													{accounts.map((account) => (
														<SelectItem
															value={account.id}
															className="h-12 px-4"
														>
															{account.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="categoryId"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Select
												onValueChange={field.onChange}
												value={field.value}
											>
												<SelectTrigger className="w-full py-5">
													<SelectValue placeholder="Categoria" />
												</SelectTrigger>
												<SelectContent
													className="w-full min-w-full"
													side="bottom"
													align="start"
													sideOffset={4}
												>
													{categories.map((category) => (
														<SelectItem
															value={category.id}
															className="h-12 px-4"
														>
															{category.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<DatePickerField name="date" />

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
					</FormProvider>
				</DialogContent>
			</Dialog>
		</div>
	);
}
