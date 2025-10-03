import { create } from "zustand";

interface BalanceState {
	showBalance: boolean;
	toggleBalance: () => void;
}

export const useBalanceStore = create<BalanceState>()((set) => ({
	showBalance: true,
	toggleBalance: () => set((state) => ({ showBalance: !state.showBalance })),
}));
