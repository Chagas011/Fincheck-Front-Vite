import { Button } from "@/components/ui/button";

import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
// @ts-expect-error not-types
import "swiper/css";
import { AccountsNavigations } from "./AccountsNavigations";
import { useAccountController } from "./useAccountController";
import { formatCurrency } from "@/lib/formatCurrence";
import { useBalanceStore } from "@/store/balance";
import { cn } from "@/lib/utils";

import { EyeOffIcon, PlusCircleIcon } from "lucide-react";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { NewAccountModal } from "../NewAccountModal";

export function Accounts() {
	const { sliderState, setSliderState, windowWidth } = useAccountController();
	const { showBalance, toggleBalance } = useBalanceStore();
	const accounts: number[] = [];
	return (
		<div className="rounded-2xl bg-teal-9 h-full w-full lg:p-10 px-4 py-8 flex flex-col">
			<div className="flex flex-col gap-2">
				<span className="text-white tracking-[-0.5px]">Saldo Total</span>
				<div className="flex gap-2 items-center">
					<strong
						className={cn(
							"text-3xl tracking-[-1px] text-white",
							!showBalance && "blur-sm"
						)}
					>
						{accounts.length < 1 ? formatCurrency(0) : formatCurrency(85785.35)}
					</strong>
					<Button
						variant={"ghost"}
						className="w-8 h-8 hover:bg-teal-8"
						onClick={toggleBalance}
					>
						{showBalance ? (
							<EyeOffIcon className="text-white !w-4 !h-4" />
						) : (
							<EyeOpenIcon className="text-white !w-4 !h-4" />
						)}
					</Button>
				</div>
			</div>

			<div className="flex-1 flex flex-col justify-end mt-10 lg:mt-0">
				{accounts.length > 0 ? (
					<>
						<div>
							<Swiper
								spaceBetween={16}
								slidesPerView={windowWidth >= 600 ? 2.2 : 1.2}
								onSlideChange={(swiper) => {
									setSliderState({
										isBeginning: swiper.isBeginning,
										isEnd: swiper.isEnd,
									});
								}}
							>
								<div
									className="flex justify-between mb-5"
									slot="container-start"
								>
									<strong className="text-white tracking-[-1px] text-lg">
										Minhas Contas
									</strong>
									<AccountsNavigations
										isBeginning={sliderState.isBeginning}
										isEnd={sliderState.isEnd}
									/>
								</div>

								<div className="mt-5">
									<SwiperSlide>
										<AccountCard
											color="#7950f2"
											currentBalance={300}
											name="Nubank"
											type="CASH"
										/>
									</SwiperSlide>

									<SwiperSlide>
										<AccountCard
											color="#f05e22"
											currentBalance={5000}
											name="XP INVESTMENT"
											type="INVESTMENT"
										/>
									</SwiperSlide>

									<SwiperSlide>
										<AccountCard
											color="#f05e22"
											currentBalance={5000}
											name="XP INVESTMENT"
											type="INVESTMENT"
										/>
									</SwiperSlide>
								</div>
							</Swiper>
						</div>
					</>
				) : (
					<>
						<div className="flex  mb-5">
							<strong className="text-white tracking-[-1px] text-lg">
								Minhas Contas
							</strong>
						</div>

						<div className="flex flex-col items-center justify-center mt-4">
							<NewAccountModal>
								<Button className="flex gap-3 flex-col  bg-teal-9 hover:bg-teal-6 w-full h-[204px] border-2 border-dashed border-teal-4 ">
									<PlusCircleIcon className="!w-8 !h-8" />

									<span className="font-medium tracking-[-0.5px] ">
										Cadastre uma
										<span className="block">nova Conta</span>
									</span>
								</Button>
							</NewAccountModal>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
