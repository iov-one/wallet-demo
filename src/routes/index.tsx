import React from "react";
import { Route, Switch } from "react-router-dom";

import { ConfirmTransactionPage, InvitePage, PaymentPage, SendPaymentPage } from "~/containers";
import RequireLogin from "~/containers/RequireLogin";
import Balance from "~/routes/balance/container";
import ChangePassword from "~/routes/changePassword/container";
import Home from "~/routes/home/container";
import LogIn from "~/routes/login/container";
import ReceiveIov from "~/routes/receiveIov/container";
import ReceiveExternal from "~/routes/receiveNonIov/container";
import SecurityCenter from "~/routes/securityCenter/container";
import SignupName from "~/routes/signupName/container";
import SignupPass from "~/routes/signupPass/container";

export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const SIGNUP_ROUTE = "/signup";
export const SET_NAME_ROUTE = "/name";
export const TERMS_OF_SERVICE_ROUTE = "/terms";
export const PRIVACY_POLICY_ROUTE = "/privacy";
export const BALANCE_ROUTE = "/balance";
export const SECURITY_CENTER_ROUTE = "/security-center";
export const CHANGE_PASSWORD_ROUTE = "/change-password";
export const BACKUP_PHRASE_ROUTE = "/backup-phrase";
export const PAYMENT_ROUTE = "/payment";
export const INVITE_ROUTE = "/invite";

export const SEND_PAYMENT = "/send-payment";
export const CONFIRM_TRANSACTION = "/confirm-transaction";
export const RECEIVE_FROM_IOV_USER = "/receive-from-iov"
export const RECEIVE_FROM_NON_IOV_USER = "/receive-external"

export const MainRouter = () => (
  <Switch>
    <Route exact path={HOME_ROUTE} component={Home} />
    <Route exact path={SIGNUP_ROUTE} component={SignupPass} />
    <Route exact path={LOGIN_ROUTE} component={LogIn} />
    <Route exact path={SET_NAME_ROUTE} component={SignupName} />
    <RequireLogin>
      <Route exact path={BALANCE_ROUTE} component={Balance} />
      <Route exact path={RECEIVE_FROM_IOV_USER} component={ReceiveIov} />
      <Route exact path={RECEIVE_FROM_NON_IOV_USER} component={ReceiveExternal} />
      <Route exact path={SECURITY_CENTER_ROUTE} component={SecurityCenter} />
      <Route path={PAYMENT_ROUTE} component={PaymentPage} />
      <Route path={`${SEND_PAYMENT}/:iovAddress`} component={SendPaymentPage} />
      <Route
        path={`${CONFIRM_TRANSACTION}/:iovAddress/:token/:tokenAmount`}
        component={ConfirmTransactionPage}
      />
      <Route exact path={INVITE_ROUTE} component={InvitePage} />
      <Route path={CHANGE_PASSWORD_ROUTE} component={ChangePassword} />
      <Route path={BACKUP_PHRASE_ROUTE} component={SecurityCenter} />
    </RequireLogin>
  </Switch>
);
export default MainRouter;
