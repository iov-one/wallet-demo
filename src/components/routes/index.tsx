import React from "react";
import { BrowserRouter as HashRouter, Route } from "react-router-dom";

import { CounterContainer, Home } from "../pages";

const MainRouter = () => (
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/counter/" component={CounterContainer} />
    </div>
  </HashRouter>
);

export default MainRouter;
