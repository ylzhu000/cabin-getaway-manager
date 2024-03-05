import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import Logout from "../features/authentication/Logout";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";

const StyledHeaderMenu = styled.ul`
	display: flex;
	gap: 0.4rem;
`;

export default function HeaderMenu() {
	const navigate = useNavigate();
	return (
		<StyledHeaderMenu>
			<li>
				<ButtonIcon onClick={() => navigate("/account")}>
					<HiOutlineUser />
				</ButtonIcon>
			</li>
			<li>
				<Logout />
			</li>
		</StyledHeaderMenu>
	);
}
