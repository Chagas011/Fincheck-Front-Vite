import { BankAccountTypeIcon } from "@/components/icons/BankAccountTypeIcon";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatCurrence";

interface AccountCardProps {
	color: string;
	name: string;
	currentBalance: number;
	type: "CASH" | "CHECKING" | "INVESTMENT";
}

export function AccountCard({
	color,
	name,
	currentBalance,
	type,
}: AccountCardProps) {
	return (
		<Card
			className="border-b-4 border-b-teal-6"
			style={{ borderBottomColor: color }}
		>
			<CardHeader>
				<CardTitle>
					<BankAccountTypeIcon type={type} />
				</CardTitle>
				<span className="text-gray-8 font-medium tracking-[-0.5px]">
					{name}
				</span>
			</CardHeader>
			<CardContent className="flex flex-col gap-1">
				<p className="font-medium tracking-[-0.5px]">
					{formatCurrency(currentBalance)}
				</p>
				<span className="text-gray-6 tracking-[-0.5px]">Saldo Atual</span>
			</CardContent>
			<CardFooter />
		</Card>
	);
}
