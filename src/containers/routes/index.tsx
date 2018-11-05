import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

import {
  BackupAccountPage,
  BalancePage,
  ConfirmTransactionPage,
  HomePage,
  ImportAccountPage,
  LoginPage,
  PasswordPage,
  SendTokenPage,
} from "../../containers";

const Wrapper = styled.div`
  height: 100vh;
`;

const MainRouter = () => (
  <Router>
    <Wrapper>
      <Route exact path="/" component={HomePage} />
      <Route path="/setPassword/" component={PasswordPage} />
      <Route path="/balance/" component={BalancePage} />
      <Route path="/account-backup/" component={BackupAccountPage} />
      <Route path="/import-account/" component={ImportAccountPage} />
      <Route path="/login/" component={LoginPage} />
      <Route path="/send-token/" component={SendTokenPage} />
      <Route path="/confirm-transaction/:iovAddress/:tokenAmount/" component={ConfirmTransactionPage} />
    </Wrapper>
  </Router>
);

export default MainRouter;
