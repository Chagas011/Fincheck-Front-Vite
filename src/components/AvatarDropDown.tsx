import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { getInitials } from "@/lib/getInitials";
import { useAuthStore } from "@/store/auth";

interface AvatarDropDownProps {
	user: {
		name: string;
		email: string;
	};
}

export function AvatarDropDown({ user }: AvatarDropDownProps) {
	const { logout } = useAuthStore();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className="bg-teal-1 flex justify-center items-center w-12 h-12 border border-teal-5">
					<p className="font-medium text-sm tracking-[-0.5px] text-teal-9">
						{getInitials(user.name)}
					</p>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="px-4" align="end">
				<DropdownMenuLabel>{user.email}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
