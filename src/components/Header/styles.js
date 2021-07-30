import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;

  width: 100%;

  align-items: center;

  padding: 10px 30px;

  background-color: #18181b;

  -webkit-box-shadow: 0px 10px 13px -7px #000000,
    5px 5px 15px 5px rgba(0, 0, 0, 0);
  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);

  img {
    margin-left: 10px;
  }
`;

export const AppTitle = styled.h1`
  font-size: 2rem;
  color: #efeff1;
`;

export const Address = styled.span`
  color: #efeff190;

  margin-left: auto;
`;
