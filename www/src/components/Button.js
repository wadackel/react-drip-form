import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  margin: 0;
  padding: 0.8em 2em;
  border: ${props => props.primary
    ? 'none'
    : '1px solid #dbdbdb'};
  border-radius: 3px;
  background: ${props => props.primary
    ? '#20c59d'
    : 'transparent'};
  color: inherit;
  color: ${props => props.primary
    ? '#fff'
    : 'inherit'};
  font-size: ${props => props.small
    ? '0.875rem'
    : '1rem'};
  font-weight: ${props => props.primary
    ? 'bold'
    : 'normal'};
  line-height: 1.4;
  cursor: pointer;
  transition: all 80ms ease-out;

  &.primary:active {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16) inset;
    background: #1a9c7d;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    background: ${props => props.primary
      ? '#1dad8a'
      : 'rgba(0, 0, 0, 0.02)'};
  }

  &:active {
    background: rgba(0, 0, 0, 0.04);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06) inset;
  }

  &:disabled {
    opacity: 0.4;
    background: ${props => props.primary
      ? 'rgba(0, 0, 0, 0.04)'
      : '#cacaca'};
    border-color: rgba(0, 0, 0, 0.04);
    cursor: not-allowed;
  }
`;

export default Button;
