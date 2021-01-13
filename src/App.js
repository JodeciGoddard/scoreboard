import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { RecoilRoot } from 'recoil';

import Login from './screens/Login.js';
import SignUp from './screens/SignUp';
import Dashboard from './screens/Dashboard';

function App() {
  return (
    <RecoilRoot>
      <Router >
        <div className="App">
          <Switch>
            <Login path="/" exact />
            <SignUp path="/SignUp" />
            <Dashboard path="/dashboard" />
          </Switch>
        </div>

      </Router>
    </RecoilRoot>

  );
}

export default App;
