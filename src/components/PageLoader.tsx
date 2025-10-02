import { Skeleton } from "./ui/skeleton";
import logo_gray from "../assets/logo_gray.svg";
export function PageLoader() {
	return (
		<div className="bg-teal-9 w-full h-full flex flex-col">
			<div className="flex items-center space-x-4 p-5">
				<Skeleton className="h-12 w-12 rounded-full bg-gray-5" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[450px] bg-gray-5" />
					<Skeleton className="h-4 w-[300px] bg-gray-5" />
				</div>
			</div>

			<div className="flex justify-center items-center h-screen">
				<img src={logo_gray} alt="logo_gray" className="w-52 h-52" />
			</div>
		</div>
	);
}
