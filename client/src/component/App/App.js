/**
 * Module principal
 */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.scss";
import Cellar from "../../components/Cellar/Cellar";


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Cellar} />
        </Switch>
      </Router>
    </>
  );
}
export default App;