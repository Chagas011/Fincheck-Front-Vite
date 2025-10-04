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
				className="bg-transparent hover:bg-teal-8 disabled:opacity-40"
				onClick={() => swiper.slidePrev()}
				disabled={isBeginning}
			>
				<ChevronLeftIcon className="!w-8 !h-8" />
			</Button>
			<Button
				className="bg-transparent hover:bg-teal-8 disabled:opacity-40"
				onClick={() => swiper.slideNext()}
				disabled={isEnd}
			>
				<ChevronRightIcon className="!w-8 !h-8" />
			</Button>
		</div>
	);
}
