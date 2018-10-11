import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

import { BalancePage, HomePage, PasswordPage } from "../pages";

const Wrapper = styled.div`
  height: 100vh;
`;

const MainRouter = () => (
  <Router>
    <Wrapper>
      <Route exact path="/" component={HomePage} />
      <Route path="/setPassword/" component={PasswordPage} />
      <Route path="/balance/" component={BalancePage} />
    </Wrapper>
  </Router>
);

export default MainRouter;
