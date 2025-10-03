import { PageLoader } from "@/components/PageLoader";

import { useGetUser } from "@/hooks/useGetUser";

import logo from "../../../assets/logo.svg";
import { AvatarDropDown } from "@/components/AvatarDropDown";
import { Accounts } from "./components/Accounts";
import { Transactions } from "./components/Transactions";

export function Dashboard() {
	const { data, isFetching, isError } = useGetUser();

	if (isFetching) return <PageLoader />;
	if (isError) return <p>Erro ao buscar usuário. Faça login novamente.</p>;
	if (!data) {
		return {};
	}
	return (
		<div className="h-full w-full p-4 lg:p-8 lg:pt-6 flex flex-col gap-4 mb-5">
			<header className="h-12 flex justify-between items-center">
				<img src={logo} alt="logo" className="h-6" />
				<div className="">
					<AvatarDropDown user={data} />
				</div>
			</header>

			<main className="flex flex-1 gap-4 h-full flex-col lg:flex-row">
				<div className="w-full lg:w-1/2">
					<Accounts />
				</div>
				<div className="w-full lg:w-1/2">
					<Transactions />
				</div>
			</main>
		</div>
	);
}
