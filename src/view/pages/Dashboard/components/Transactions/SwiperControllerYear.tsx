import { useEffect, useState } from "react";
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
	year: number;
}

export function SwiperControllerYear({
	onChangeYear,
	year,
}: SwiperControllerYearProps) {
	const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	// Converte o ano em índice dentro do array YEARS
	const yearIndex = YEARS.findIndex((y) => Number(y) === year);

	useEffect(() => {
		if (!swiperInstance) return;
		if (yearIndex >= 0 && swiperInstance.activeIndex !== yearIndex) {
			swiperInstance.slideTo(yearIndex, 300); // animação suave
		}
	}, [yearIndex, swiperInstance]);

	return (
		<div className="flex gap-4 items-center w-[355px] lg:w-full max-w-sm mx-auto">
			<Button
				disabled={isBeginning}
				className="bg-transparent p-5 text-black hover:text-white hover:bg-teal-8 disabled:opacity-40"
				onClick={() => swiperInstance?.slidePrev()}
			>
				<ChevronLeftIcon className="!w-6 !h-6" />
			</Button>

			<Swiper
				className="flex-1"
				spaceBetween={16}
				slidesPerView={1.3}
				centeredSlides
				onSwiper={setSwiperInstance}
				initialSlide={yearIndex >= 0 ? yearIndex : 0}
				onSlideChange={(swiper) => {
					setIsBeginning(swiper.isBeginning);
					setIsEnd(swiper.isEnd);
					const selectedYear = Number(YEARS[swiper.activeIndex]);
					if (selectedYear !== year) onChangeYear(selectedYear);
				}}
			>
				{YEARS.map((y, index) => (
					<SwiperSlide key={y}>
						{({ isActive }) => (
							<YearsCard year={Number(y)} isActive={isActive} index={index} />
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
