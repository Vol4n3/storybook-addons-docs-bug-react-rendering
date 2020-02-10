import React from 'react';
import './App.css';
import {Button} from './components/button';
import {ThemeProvider} from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={{color:"#fff",bg:"#f0f"}}>
      <Button>Hello Styled Component</Button>
    </ThemeProvider>
  );
}

export default App;
