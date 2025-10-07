import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useState } from "react";

interface DatePickerFieldProps {
	name: string;
}

export function DatePickerField({ name }: DatePickerFieldProps) {
	const { control } = useFormContext();
	const [open, setOpen] = useState(false);
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormControl>
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									data-empty={!field.value}
									className="w-full h-[52px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{field.value ? (
										format(field.value, "PPP", { locale: ptBR })
									) : (
										<span>Escolha uma data</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0" align="start">
								<Calendar
									mode="single"
									selected={field.value}
									onSelect={(date) => {
										field.onChange(date);
										setOpen(false);
									}}
									locale={ptBR}
								/>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
}
