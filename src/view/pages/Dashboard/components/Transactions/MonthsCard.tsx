import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MonthsCardProps {
	month: string;
	isActive: boolean;
	index: number;
	onClickMonth: () => void;
}

export function MonthsCard({ month, isActive, onClickMonth }: MonthsCardProps) {
	return (
		<Card className="p-0 rounded-md">
			<CardContent className="p-0">
				<Button
					type="button"
					className={cn(
						"py-4 w-full bg-transparent hover:bg-teal-9 text-black hover:text-white transition-all ease-in-out",
						isActive && "bg-teal-9 text-white"
					)}
					onClick={onClickMonth}
				>
					{month}
				</Button>
			</CardContent>
		</Card>
	);
}
