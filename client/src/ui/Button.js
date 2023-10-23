import styled, { css } from "styled-components";

const Button = styled.button`
  margin: 0rem 0.5rem 0 0.5rem;
  padding: 0.6rem 1rem 0.6rem 1rem;
  outline: none;
  font-size: 1.2rem;
  width: 5rem;
  border: none;
  border-radius: 0.6rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-family: Montserrat;
  font-weight: 400;

  @media (max-width: 500px) {
    font-size: 0.9rem;
    margin-top: 1rem;
  }

  ${(props) =>
    props.type === "deletebtn" &&
    css`
      background-color: #c70039;
      width: 8rem;
      color: white;

      &:hover {
        background-color: #952323;
      }
    `};

  ${(props) =>
    props.type === "createbtn" &&
    css`
      background-color: #337ccf;
      padding: 0.8rem;
      display: flex;
      justify-content: center;
      color: white;
      font-size: 1.2rem;
      width: 10rem;
      margin: 1rem 0 1rem 0;

      &:hover {
        background-color: #2c5191;
      }

      @media (max-width: 500px) {
        font-size: 0.8rem;
        width: 5rem;
        padding: 0.6rem;
        margin-top: 1rem;
      }
    `};

  ${(props) =>
    props.type === "cancelbtn" &&
    css`
      background-color: white;
      border: 1px solid #c0c0c0;
      width: 6rem;

      padding: 0 1rem 0 1rem;
      font-weight: 500;

      &:hover {
        background-color: grey;
        color: #000;
      }

      @media (max-width: 500px) {
        font-size: 0.8rem;
        height: 2rem;
        width: 5rem;
        padding: 0.6rem;
      }
    `};

  ${(props) =>
    props.type === "editbtn" &&
    css`
      background-color: #337ccf;
      width: 7rem;
      color: white;
      &:hover {
        background-color: #2c5191;
      }
    `};

  ${(props) =>
    props.type === "authbtn" &&
    css`
      background-color: #000;
      padding: 0.8rem;
      width: 10rem;
      color: white;

      @media (max-width: 500px) {
        font-size: 0.8rem;
        width: 6rem;
        padding: 0.6rem;
        margin-top: 1rem;
      }
    `};

  ${(props) =>
    props.type === "refreshbtn" &&
    css`
      background-color: #d3d3d3;
      color: #000;
      padding: 0.5rem;
      width: 3rem;
      margin-bottom: 1rem;
      align-self: end;

      &:hover {
        background-color: #fff;
        color: #000;
      }
    `};
  ${(props) =>
    props.type === "removeFavbtn" &&
    css`
      background-color: #fecaca;
      color: #dc2626;
      padding: 0.5rem;
      width: 2.5rem;
      margin-bottom: 1rem;

      &:hover {
        background-color: #f87171;
        color: #7f1d1d;
      }
    `};
  ${(props) =>
    props.type === "themeBtn" &&
    css`
      background-color: #fecaca;
      color: var(--theme-color);
      background-color: var(--theme-btn-bg-color);
      padding: 0.3rem 0rem 0.1rem 0rem;
      width: 3rem;
      margin-right: 5rem;
      border: 1px solid var(--border-color);

      &:hover {
        background-color: var(--theme-btn-bg-hover);
      }
    `};

  ${(props) =>
    props.responsive === "isMobile" &&
    css`
      @media (max-width: 1000px) {
        display: none;
      }
    `};
`;

export default Button;
