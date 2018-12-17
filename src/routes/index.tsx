import React from "react";
import { Route, Switch } from "react-router-dom";
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
import RequireLogin from "~/containers/RequireLogin";
import Home from "~/routes/home/container";
import LogIn from "~/routes/login/container";
import SignupName from "~/routes/signupName/container";
import SignupPass from "~/routes/signupPass/container";

export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";
export const SET_NAME_ROUTE = "/name";
export const TERMS_OF_SERVICE_ROUTE = "/terms";
export const PRIVACY_POLICY_ROUTE = "/privacy";
export const BALANCE_ROUTE = "/balance";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
`;

export const MainRouter = () => (
  <Switch>
    <Route exact path={HOME_ROUTE} component={Home} />
    <Route exact path={SIGNUP_ROUTE} component={SignupPass} />
    <Route exact path={LOGIN_ROUTE} component={LogIn} />
    <Route exact path={SET_NAME_ROUTE} component={SignupName} />
    <RequireLogin>
      <Wrapper>
        <Route path="/send-payment/:iovAddress" component={SendPaymentPage} />
        <Route path="/setPassword/" component={PasswordPage} />
        <Route path="/account-backup/" component={BackupAccountPage} />
        <Route path="/import-account/" component={ImportAccountPage} />
        <Route path="/payment/" component={PaymentPage} />
        <Route path={BALANCE_ROUTE} component={BalancePage} />
        <Route path="/invite/" component={InvitePage} />
        <Route
          path="/confirm-transaction/:iovAddress/:token/:tokenAmount/"
          component={ConfirmTransactionPage}
        />
      </Wrapper>
    </RequireLogin>
  </Switch>
);
export default MainRouter;
