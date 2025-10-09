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

import { incomeSchema, type IncomeSchemaType } from "./schema";
import { BanknoteArrowUp } from "lucide-react";
import { DatePickerField } from "@/components/DatePicker";
import { useGetBankAccounts } from "@/hooks/bankAccounts/get";
import { useGetCategories } from "@/hooks/categories/get";
import { useCreateTransaction } from "@/hooks/transactions/create";
import { numericValue } from "@/lib/formatCurrence";

export function NewIncomeModal() {
	const form = useForm<IncomeSchemaType>({
		resolver: zodResolver(incomeSchema),
		defaultValues: {
			name: "",
			bankAccountId: "",
			categoryId: "",
			date: new Date(),
			value: "",
			type: "INCOME",
		},
		mode: "onChange",
	});
	const { mutate } = useCreateTransaction();
	const { data } = useGetBankAccounts();
	const accounts = data ?? [];
	const { data: category } = useGetCategories();
	const categories =
		category?.filter((categorie) => categorie.type === "INCOME") ?? [];
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
					<Button className="flex gap-2 h-12 justify-start w-full bg-transparent hover:bg-gray-1 text-black">
						<BanknoteArrowUp className="!w-5 !h-5 text-teal-7" />
						<span className="text-sm">Nova Receita</span>
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-sm w-ful p-4">
					<DialogHeader>
						<DialogTitle className="text-center">Nova Receita</DialogTitle>
					</DialogHeader>
					<FormProvider {...form}>
						<form onSubmit={handleSubmit} className="space-y-4 mt-10">
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
												placeholder="Nome da Receita"
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
												<SelectContent className="w-full min-w-full">
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
													<SelectValue placeholder="Receber na conta" />
												</SelectTrigger>
												<SelectContent className="w-full min-w-full">
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
