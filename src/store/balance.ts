import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
interface BalanceState {
	showBalance: boolean;
	toggleBalance: () => void;
}

export const useBalanceStore = create<BalanceState>()(
	persist(
		(set) => ({
			showBalance: true,
			toggleBalance: () =>
				set((state) => ({ showBalance: !state.showBalance })),
		}),
		{
			name: "balance-storage",
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
