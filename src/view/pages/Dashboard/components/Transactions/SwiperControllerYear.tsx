import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-expect-error not-types
import "swiper/css";
import type { Swiper as SwiperType } from "swiper";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { YEARS } from "@/app/config/constants";

import { YearsCard } from "./YearsCard";
interface SwiperControllerYearProps {
	onChangeYear: (year: number) => void;
}
export function SwiperControllerYear({
	onChangeYear,
}: SwiperControllerYearProps) {
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	return (
		<div className="flex gap-4 items-center w-[355px] lg:w-full max-w-sm mx-auto">
			<Button
				disabled={isBeginning}
				className="bg-transparent  p-5 text-black hover:text-white hover:bg-teal-8 disabled:opacity-40"
				onClick={() => swiperInstance?.slidePrev()}
			>
				<ChevronLeftIcon className="!w-6 !h-6" />
			</Button>

			<Swiper
				className="flex-1" //
				spaceBetween={16}
				slidesPerView={1.3}
				centeredSlides
				onSwiper={setSwiperInstance}
				initialSlide={YEARS.length - 1}
				onSlideChange={(swiper) => {
					setIsBeginning(swiper.isBeginning);
					setIsEnd(swiper.isEnd);
					onChangeYear(Number(YEARS[swiper.activeIndex]));
				}}
			>
				{YEARS.map((year, index) => (
					<SwiperSlide key={year}>
						{({ isActive }) => (
							<YearsCard year={year} isActive={isActive} index={index} />
						)}
					</SwiperSlide>
				))}
			</Swiper>

			<Button
				disabled={isEnd}
				className="bg-transparent p-5 text-black hover:text-white hover:bg-teal-8 disabled:opacity-40"
				onClick={() => swiperInstance?.slideNext()}
			>
				<ChevronRightIcon className="!w-6 !h-6" />
			</Button>
		</div>
	);
}
