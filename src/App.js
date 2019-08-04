import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Login from './Pages/Login.js'
import Servers from './Pages/ServerList.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route path="/"  exact component={Login}/>
            <Route path="/servers"  exact component={Servers}/>
            {/* <Route component={NoMatch}/> */}
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
