import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
	BanknoteArrowDown,
	BanknoteArrowUp,
	Building,
	PlusIcon,
} from "lucide-react";

export function Fab() {
	return (
		<div className="fixed bottom-6 right-6 z-50">
			<DropdownMenu>
				<DropdownMenuTrigger>
					<Button className="bg-teal-9 hover:bg-teal-7 rounded-full w-12 h-12">
						<PlusIcon className="!w-8 !h-8" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					className="px-1 w-[164px] h-[248px] flex flex-col justify-evenly"
					align="end"
				>
					<DropdownMenuItem>
						<Button className="flex gap-2 h-12 justify-start w-full bg-transparent hover:bg-gray-1 text-black">
							<BanknoteArrowUp className="!w-5 !h-5 text-teal-7" />
							<span className="text-sm">Nova Receita</span>
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Button className="flex h-12 justify-start gap-2 w-full bg-transparent text-black hover:bg-gray-1">
							<BanknoteArrowDown className="!w-5 !h-5 text-red-7" />
							<span className="text-sm">Nova Despesa</span>
						</Button>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Button className="flex h-12 justify-start gap-2 w-full bg-transparent hover:bg-gray-1 text-black">
							<Building className="!w-5 !h-5 text-blue-7" />
							<span className="text-sm">Nova Conta</span>
						</Button>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
