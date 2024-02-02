import ButtonIcon from "../../ui/ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useLogout";

export default function Logout() {
	const { logout, isLoggingOut } = useLogout();

	return (
		<ButtonIcon disabled={isLoggingOut}>
			<HiArrowRightOnRectangle onClick={() => logout()} />
		</ButtonIcon>
	);
}
