import * as React from 'react';
import styled from 'styled-components';


const StyledButton = styled.button`
background: ${props=> props.theme.bg};
color: ${props=> props.theme.color};
`;
export class Button extends React.Component{
  render() {
    return<StyledButton {...this.props}/>;
  }
}
