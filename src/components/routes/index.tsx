import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { CounterContainer, Home } from "../pages";

const MainRouter = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/counter/" component={CounterContainer} />
    </div>
  </Router>
);

export default MainRouter;
