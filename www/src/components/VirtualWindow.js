import React from 'react';
import styled from 'styled-components';

const Window = styled.div`
  padding: 20px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  border-radius: 3px;
`;

const TitleBar = styled.div`
  margin: -10px -4px 10px;

  & span {
    display: inline-block;
    margin: 0 4px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  & span:nth-child(1) {
    background: #ff5f57;
  }

  & span:nth-child(2) {
    background: #ffc330;
  }

  & span:nth-child(3) {
    background: #29c941;
  }
`;

const Content = styled.div`
  margin: 0;
`;

const VirtualWindow = ({ children }) => (
  <Window>
    <TitleBar>
      <span />
      <span />
      <span />
    </TitleBar>

    <Content>
      {children}
    </Content>
  </Window>
);

export default VirtualWindow;
