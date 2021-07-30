import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #18181b;

  flex-direction: column;

  padding: 30px 20px;

  border-radius: 10px;

  div {
    display: flex;

    align-items: center;
    justify-content: space-between;
  }

  -webkit-box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000,
    -1px -16px 16px 3px rgba(0, 0, 0, 0);
  box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000,
    -1px -16px 16px 3px rgba(0, 0, 0, 0);

  margin-bottom: 20px;
`;

export const Author = styled.h2`
  font-size: 1rem;
  color: #efeff180;

  margin-bottom: 20px;
`;

export const TipAmount = styled.span`
  color: #efeff1;
`;

export const Content = styled.p`
  font-size: 1.5rem;
  color: #efeff1;

  margin-bottom: 20px;
`;

export const Button = styled.button`
  padding: 5px 10px;

  background-color: #9147ff;

  border: none;
  border-radius: 10px;
  font-size: 1.25rem;
  color: #efeff1;

  font-weight: bold;

  cursor: pointer;

  :hover {
    background-color: #822eff;
  }
`;
