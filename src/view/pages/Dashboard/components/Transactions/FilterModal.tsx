import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FilterIcon } from "@/components/icons/FilterIcon";
import { Button } from "@/components/ui/button";
import { SwiperControllerYear } from "./SwiperControllerYear";
export function FilterModal() {
	return (
		<div>
			<Dialog>
				<DialogTrigger>
					<Button className="bg-teal-9 hover:bg-teal-7">
						<FilterIcon />
					</Button>
				</DialogTrigger>
				<DialogContent className="max-w-md w-full">
					<DialogHeader>
						<DialogTitle className="text-center">Filtros</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-4">
						<h2 className="text-lg font-bold">Conta</h2>
						<Button className="flex justify-start w-full h-[40px] bg-transparent hover:bg-gray-1 text-black">
							XP Investimentos
						</Button>
						<Button className="flex justify-start w-full h-[40px] bg-transparent hover:bg-gray-1 text-black">
							Nubank
						</Button>
						<Button className="flex justify-start w-full h-[40px] bg-transparent hover:bg-gray-1 text-black">
							Carteira
						</Button>
					</div>

					<div className="flex flex-col">
						<h2 className="text-lg font-bold">Ano</h2>
						<SwiperControllerYear />
					</div>
					<DialogFooter className="mt-5">
						<DialogClose asChild>
							<Button className="w-full h-[54px] bg-teal-9 hover:bg-teal-8 rounded-2xl">
								Aplicar Filtros
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</div>
	);
}
