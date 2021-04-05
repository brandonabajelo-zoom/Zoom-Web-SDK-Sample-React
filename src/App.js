import './App.css';
import { Switch, Route } from "react-router-dom";
import { Header, Home, WebMeeting } from './Components';

export default function App() {
  return (
      <div className="container-fluid">
        <main>
          <Header />
          <Switch>
            <Route path="/web_meeting">
              <WebMeeting />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </div>
  );
}