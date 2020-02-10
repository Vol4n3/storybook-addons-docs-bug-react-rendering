import React from 'react';
import {ThemeProvider} from 'styled-components';

class ThemeOptions extends React.Component {

  componentDidMount() {
    // window parent for access outside iframe
    window.parent.ListenerThemeChange = theme => {
      this.setState({
        theme
      });
    };
  }

  render() {
    return (
      <ThemeProvider theme={this.state.theme}>
        {this.props.children}
      </ThemeProvider>
    );
  }

  state = {
    theme: {}
  };
}
export const ThemeDecorator = storyFn => (
  <ThemeOptions>{storyFn()}</ThemeOptions>
);
