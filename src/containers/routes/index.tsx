import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled from "styled-components";

import {
  BackupAccountPage,
  BalancePage,
  ConfirmTransactionPage,
  HomePage,
  ImportAccountPage,
  InvitePage,
  LoginPage,
  PasswordPage,
  PaymentPage,
  SendPaymentPage,
} from "../../containers";

// TODO improve redux config using connected-react-router remove middle components
// levaring the usage of WithRouter
const Wrapper = styled.div`
  height: 100vh;
`;

const MainRouter = () => (
  <Router>
    <Wrapper>
      <Route exact path="/" component={HomePage} />
      <Route path="/balance/" component={BalancePage} />
      <Route path="/send-payment/:iovAddress" component={SendPaymentPage} />
      <Route path="/setPassword/" component={PasswordPage} />
      <Route path="/account-backup/" component={BackupAccountPage} />
      <Route path="/import-account/" component={ImportAccountPage} />
      <Route path="/login/" component={LoginPage} />
      <Route path="/payment/" component={PaymentPage} />
      <Route path="/invite/" component={InvitePage} />
      <Route
        path="/confirm-transaction/:iovAddress/:token/:tokenAmount/"
        component={ConfirmTransactionPage}
      />
    </Wrapper>
  </Router>
);

export default MainRouter;
