import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    css`
      font-size: 20px;
      font-weight: 600;
    `}
`;

export default Heading;
