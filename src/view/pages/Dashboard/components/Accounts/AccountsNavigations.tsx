import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useSwiper } from "swiper/react";

interface AccountsNavigationsProps {
	isBeginning: boolean;
	isEnd: boolean;
}
export function AccountsNavigations({
	isBeginning,
	isEnd,
}: AccountsNavigationsProps) {
	const swiper = useSwiper();
	return (
		<div className="flex gap-2 items-center">
			<Button
				className="bg-transparent hover:bg-teal-8 pl-2.5 pr-3.5 disabled:opacity-40"
				onClick={() => swiper.slidePrev()}
				disabled={isBeginning}
			>
				<ChevronLeftIcon className="text-4xl w-10 h-10" />
			</Button>
			<Button
				className="bg-transparent hover:bg-teal-8 pl-2.5 pr-3.5"
				onClick={() => swiper.slideNext()}
				disabled={isEnd}
			>
				<ChevronRightIcon />
			</Button>
		</div>
	);
}
