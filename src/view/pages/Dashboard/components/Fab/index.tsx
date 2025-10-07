import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Building, PlusIcon } from "lucide-react";
import { NewAccountModal } from "../NewAccountModal";
import { NewExpenseModal } from "./NewExpenseModal";
import { NewIncomeModal } from "./NewIncomeModal";

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
					className="p-0 w-[164px] h-[248px] flex flex-col justify-evenly"
					align="end"
				>
					<DropdownMenuItem className="p-0" asChild>
						<NewIncomeModal />
					</DropdownMenuItem>
					<DropdownMenuItem className="p-0" asChild>
						<NewExpenseModal />
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<NewAccountModal title="Nova Conta">
							<Button className="flex h-12 justify-start  gap-2 w-full bg-transparent hover:bg-gray-1 text-black">
								<div className="flex gap-2">
									<Building className="!w-5 !h-5 text-blue-7" />
									<span className="text-sm">Nova Conta</span>
								</div>
							</Button>
						</NewAccountModal>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
