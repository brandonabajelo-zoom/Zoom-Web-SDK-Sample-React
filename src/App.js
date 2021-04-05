import './App.css';
import { Switch, Route } from "react-router-dom";

import Header from './Components/Header';
import Home from './Components/Home';
import JoinMeeting from './Components/JoinMeeting';

export default function App() {
  return (
      <div className="container-fluid">
        <main>
          <Header />
          <Switch>
            <Route path="/join">
              <JoinMeeting />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
  );
}