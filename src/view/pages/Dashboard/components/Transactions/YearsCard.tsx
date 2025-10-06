import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { useSwiper } from "swiper/react";

interface YearsCardProps {
	year: string;
	isActive: boolean;
	index: number;
}
export function YearsCard({ year, isActive, index }: YearsCardProps) {
	const swiper = useSwiper();

	return (
		<Card className="p-0 rounded-md">
			<CardContent className="p-0">
				<Button
					className={cn(
						"py-4 w-full bg-transparent hover:bg-gray-1 text-black ",
						isActive && "bg-gray-1"
					)}
					onClick={() => swiper.slideTo(index)}
				>
					{year}
				</Button>
			</CardContent>
		</Card>
	);
}
