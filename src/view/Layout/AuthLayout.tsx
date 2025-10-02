import { Outlet } from "react-router-dom";
import illustration from "../../assets/illustration.png";
import logo from "../../assets/logo.svg";
import logo_gray from "../../assets/logo_gray.svg";

export function AuthLayout() {
	return (
		<div className="flex w-full h-full">
			<div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center p-8 ">
				<img src={logo_gray} alt="logo_gray" />
				<div className="mt-16 w-full max-w-lg">
					<Outlet />
				</div>
			</div>
			<div className="w-1/2 h-full hidden lg:flex flex-col justify-center items-center p-8">
				<img
					src={illustration}
					alt="illustration"
					className="object-contain w-full h-full max-w-[656px] max-h-[960px] select-none"
				/>
				<div className="max-w-[656px] bg-white p-10 rounded-[32px] mt-4">
					<img src={logo} />
					<p className="font-medium text-xl text-gray-700 mt-6">
						Gerencie suas finanças pessoais de uma forma simples com o fincheck,
						e o melhor, totalmente de graça!
					</p>
				</div>
			</div>
		</div>
	);
}
