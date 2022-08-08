import React from 'react';
import { Switch,Route } from 'react-router';
// import './App.css';
// import Nav from './components/Nav';
import Home from './pages/Home';
import Pages from './pages/Pages';
import Starred from './pages/Starred';
// import MainPageLayout from './components/MainPageLayout';
function App() {
  return (  
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
  );
}

export default App;
