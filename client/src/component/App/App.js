/**
 * Module principal
 */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.scss";
import Connection from "../../components/Connection/Connection";


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Connection} />
        </Switch>
      </Router>
    </>
  );
}
export default App;