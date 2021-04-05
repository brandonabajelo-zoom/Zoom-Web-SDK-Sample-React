import { Link } from "react-router-dom";

import logo from '../Images/zoom.svg'

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/">
          <div className="navbar-brand">
            <img src={logo} alt="" width="100" height="40" />
            &nbsp;
            Web SDK Sample React App
          </div>
        </Link>
        <Link to="/web_meeting">
          <div className="navbar-brand">
            <button type="button" className="btn btn-outline-primary">Web Meeting</button>
          </div>
        </Link>
      </div>
    </nav>
  );
};