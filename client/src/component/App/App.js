/**
 * Module principal
 */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.scss";
import Connection from "../../components/Connection/Connection";
import Cellar from "../../components/Cellar/Cellar";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Connection} />
          <Route path="/cellar" component={Cellar} />
        </Switch>
      </Router>
    </>
  );
}
export default App;