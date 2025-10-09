import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-expect-error not-types
import "swiper/css";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { MONTHS } from "@/app/config/constants";
import { MonthsCard } from "./MonthsCard";

interface SwiperControllerProps {
	onChangeMonth: (month: number) => void;
}

export function SwiperController({ onChangeMonth }: SwiperControllerProps) {
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	return (
		<div className="flex gap-4 items-center">
			<Button
				disabled={isBeginning}
				className="bg-transparent p-5 text-black hover:text-white hover:bg-teal-8 disabled:opacity-40"
				onClick={() => swiperInstance?.slidePrev()}
			>
				<ChevronLeftIcon className="!w-8 !h-8" />
			</Button>

			<Swiper
				spaceBetween={16}
				slidesPerView={3}
				centeredSlides
				initialSlide={new Date().getMonth()}
				onSwiper={setSwiperInstance}
				onSlideChange={(swiper) => {
					setIsBeginning(swiper.isBeginning);
					setIsEnd(swiper.isEnd);
					onChangeMonth(swiper.activeIndex);
				}}
			>
				{MONTHS.map((month, index) => (
					<SwiperSlide key={month}>
						{({ isActive }) => (
							<MonthsCard month={month} isActive={isActive} index={index} />
						)}
					</SwiperSlide>
				))}
			</Swiper>

			<Button
				disabled={isEnd}
				className="bg-transparent p-5 text-black hover:text-white hover:bg-teal-8 disabled:opacity-40"
				onClick={() => swiperInstance?.slideNext()}
			>
				<ChevronRightIcon className="!w-8 !h-8" />
			</Button>
		</div>
	);
}
