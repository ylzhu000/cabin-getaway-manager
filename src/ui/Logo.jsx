import styled from "styled-components";

const StyledLogo = styled.div`
	text-align: center;
`;

const Img = styled.img`
	height: 9.6rem;
	width: auto;
`;

function Logo({ background }) {
	return (
		<StyledLogo>
			<Img src={`/cabin-nest-logo-${background}.png`} alt="Logo" />
		</StyledLogo>
	);
}

export default Logo;
