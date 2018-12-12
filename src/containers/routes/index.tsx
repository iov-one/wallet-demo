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
import Home from "~/routes/home/container";
import LogIn from "~/routes/login/container";
import SignUp from "~/routes/signup/container";

export const HOME_ROUTE = "/";
export const LOG_IN_ROUTE = "/login";
export const SIGN_UP_ROUTE = "/signup";
export const SET_NAME_ROUTE = "/name";
export const TERMS_OF_SERVICE_ROUTE = "/terms";
export const PRIVACY_POLICY_ROUTE = "/privacy";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

const MainRouter = () => (
  <Switch>
    <Route exact path={HOME_ROUTE} component={Home} />
    <Route exact path={SIGN_UP_ROUTE} component={SignUp} />
    {/*<Route exact path={SET_NAME_ROUTE} component={SetName} />*/}
    <Route path={LOG_IN_ROUTE} component={LogIn} />
    <Router>
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
    </Router>
  </Switch>
);

export default MainRouter;
