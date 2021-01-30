/**
 * Module principal
 */
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./style.scss";
import Homepage from "../../components/Homepage/Homepage";


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" component={Homepage} />
        </Switch>
      </Router>
    </>
  );
}
export default App;