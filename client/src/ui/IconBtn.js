import styled, { css } from "styled-components";

const IconOnlyButton = styled.button`
  display: none;
  margin: 0rem 0.5rem 0 0.5rem;
  padding: 0.3rem 0rem 0.3rem 0rem;
  outline: none;
  font-size: 1.2rem;
  min-width: 3rem;
  border: none;
  border-radius: 0.6rem;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-family: Montserrat;
  font-weight: 400;

  ${(props) =>
    props.type === "deletebtn" &&
    css`
      background-color: #c70039;
      color: white;

      &:hover {
        background-color: #952323;
      }
    `};

  ${(props) =>
    props.type === "cancelbtn" &&
    css`
      background-color: white;
      border: 1px solid #c0c0c0;
      padding: 0.5rem 1rem 0.5rem 1rem;

      &:hover {
        background-color: #000;
        color: #fff;
      }
    `};

  ${(props) =>
    props.type === "editbtn" &&
    css`
      background-color: #4477ce;
      color: white;
      &:hover {
        background-color: #2c5191;
      }
    `};

  ${(props) =>
    props.responsive === "isMobile" &&
    css`
      @media (max-width: 1000px) {
        display: initial;
      }
    `};

  @media (max-width: 500px) {
  }
`;

export default IconOnlyButton;
