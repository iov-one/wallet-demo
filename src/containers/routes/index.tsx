import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import {
  BackupAccountPage,
  BalancePage,
  ConfirmTransactionPage,
  ImportAccountPage,
  InvitePage,
  PasswordPage,
  PaymentPage,
  SendPaymentPage,
} from "~/containers";
import LogIn from "~/routes/login/container";
import SignUp from "~/routes/signup/container";

export const LOG_IN_ROUTE = "/login";
export const SIGN_UP_ROUTE = "/";
export const TERMS_OF_SERVICE_ROUTE = "/terms";
export const PRIVACY_POLICY_ROUTE = "/privacy";

// TODO improve redux config using connected-react-router remove middle components
// levaring the usage of WithRouter
const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const MainRouter = () => (
  <Router>
    <Switch>
      <Route exact path={SIGN_UP_ROUTE} component={SignUp} />
      <Route path={LOG_IN_ROUTE} component={LogIn} />
      <Wrapper>
        <Route path="/send-payment/:iovAddress" component={SendPaymentPage} />
        <Route path="/setPassword/" component={PasswordPage} />
        <Route path="/account-backup/" component={BackupAccountPage} />
        <Route path="/import-account/" component={ImportAccountPage} />
        <Route path="/payment/" component={PaymentPage} />
        <Route path="/balance/" component={BalancePage} />
        <Route path="/invite/" component={InvitePage} />
        <Route
          path="/confirm-transaction/:iovAddress/:token/:tokenAmount/"
          component={ConfirmTransactionPage}
        />
      </Wrapper>
    </Switch>
  </Router>
);

export default MainRouter;
