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

import { expenseSchema, type ExpenseSchemaType } from "./schema";
import { BanknoteArrowDown } from "lucide-react";
import { DatePickerField } from "@/components/DatePicker";
import { numericValue } from "@/lib/formatCurrence";
import { useGetBankAccounts } from "@/hooks/bankAccounts/get";
import { useGetCategories } from "@/hooks/categories/get";
import { useCreateTransaction } from "@/hooks/transactions/create";

export function NewExpenseModal() {
	const form = useForm<ExpenseSchemaType>({
		resolver: zodResolver(expenseSchema),
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
	const { data } = useGetBankAccounts();
	const accounts = data ?? [];
	const { data: category } = useGetCategories();
	const categories =
		category?.filter((categorie) => categorie.type === "EXPENSE") ?? [];

	const { mutate } = useCreateTransaction();
	const handleSubmit = form.handleSubmit(
		({ value, name, categoryId, bankAccountId, date, type }) => {
			mutate({
				value: numericValue(value),
				name,
				categoryId,
				bankAccountId,
				date,
				type,
			});
		}
	);
	return (
		<div className="w-full">
			<Dialog>
				<DialogTrigger asChild>
					<Button className="flex  h-12 justify-start gap-2 w-full bg-transparent text-black hover:bg-gray-1">
						<BanknoteArrowDown className="!w-5 !h-5 text-red-7" />
						<span className="text-sm">Nova Despesa</span>
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-sm w-ful p-4">
					<DialogHeader>
						<DialogTitle className="text-center">Nova Despesa</DialogTitle>
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
