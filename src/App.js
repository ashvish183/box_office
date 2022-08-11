import React from 'react';
import { Switch,Route } from 'react-router';
import { ThemeProvider } from 'styled-components';

import Home from './pages/Home';
import Pages from './pages/Pages';
import Starred from './pages/Starred';

const theme = {
  mainColors: {
    blue: '#2400ff',
    gray: '#c6c6c6',
    dark: '#353535',
  },
};


function App() {
  return (  
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route exact path="/starred">
          <Starred/>
        </Route>
        <Route exact path="/show/:id">
          <Pages/>
        </Route>
        <Route>
          <div>404 page</div>
        </Route>
      </Switch>
    </ThemeProvider>
  );
}

export default App;
