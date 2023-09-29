import styled, { css } from "styled-components";

const Heading = styled.p`
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  margin: 0.5rem;
  font-weight: 600;

  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 6rem;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 3.5rem;
    `}
    ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2rem;
    `}
    ${(props) => props.as === "p" && css``}

    @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

export default Heading;
