import styled, { css } from "styled-components";

const ModalDiv = styled.div`
  background-color: white;
  padding: 2rem;
  margin: 1rem;
  border-radius: 1.5rem;
  width: 30rem;
  max-width: 95%;
  height: 10rem;
  display: grid;

  ${(props) =>
    props.type === "grid2" &&
    css`
      grid-template-rows: 1fr auto;
    `}

  ${(props) =>
    props.type === "grid3" &&
    css`
      grid-template-rows: 1fr auto;
    `}

  @media only screen and (max-width: 600px) {
    background-color: white;
    padding: 1.8rem;
    margin: 1rem;
    font-size: 1rem;
    border-radius: 1.5rem;
    width: 15rem;
    max-width: 90%;
    height: 12rem;
    display: grid;
  }
`;

export default ModalDiv;
