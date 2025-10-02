import { useWindowWidth } from "@/hooks/useWindowWidth";
import { useState } from "react";

export function useAccountController() {
	const windowWidth = useWindowWidth();
	const [sliderState, setSliderState] = useState({
		isBeginning: true,
		isEnd: false,
	});

	return {
		sliderState,
		setSliderState,
		windowWidth,
	};
}
