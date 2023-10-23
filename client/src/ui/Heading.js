import styled, { css } from "styled-components";

const Heading = styled.p`
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  margin: 0.5rem;
  font-weight: 800;
  background: rgb(56, 189, 248);
  background: linear-gradient(
    29deg,
    rgba(56, 189, 248, 1) 22%,
    rgba(224, 242, 254, 1) 80%
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;

  ${(props) =>
    props.type === "create" &&
    css`
      font-size: 6rem;
      background: rgb(23, 37, 84);
      background: linear-gradient(
        29deg,
        var(--create-h2-gradient1) 23%,
        var(--create-h2-gradient2) 79%
      );
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    `}
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
