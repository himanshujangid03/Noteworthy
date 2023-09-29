import styled, { css } from "styled-components";

const Button = styled.button`
  margin: 0rem 0.5rem 0 0.5rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  outline: none;
  font-size: 1.2rem;
  min-width: 5rem;
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
      background-color: #ae445a;
      color: white;

      &:hover {
        background-color: #813241;
      }
    `};

  ${(props) =>
    props.type === "createbtn" &&
    css`
      background-color: #4477ce;
      padding: 1rem;
      color: white;
      width: 10rem;

      &:hover {
        background-color: #2c5191;
      }
    `};

  ${(props) =>
    props.type === "cancelbtn" &&
    css`
      background-color: white;
      border: 1px solid #c0c0c0;
      padding: 0.5rem 1rem 0.5rem 1rem;
      font-weight: 500;

      &:hover {
        background-color: grey;
        color: #000;
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
    props.type === "authbtn" &&
    css`
      background-color: #000;
      color: white;
    `};
  ${(props) =>
    props.responsive === "isMobile" &&
    css`
      @media (max-width: 1000px) {
        display: none;
      }
    `};

  @media (max-width: 500px) {
    font-size: 0.9rem;
    margin-top: 1rem;
  }
`;

export default Button;
