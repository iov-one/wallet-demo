import * as React from "react";
import { connect } from "react-redux";
import Block from "~/components/layout/Block";
import Link from "~/components/layout/Link";
import Typography from "~/components/layout/Typography";
import PageMenu from "~/components/pages/PageMenu";
import { IOV_NAMESPACE } from "~/logic";
import { RECEIVE_FROM_NON_IOV_USER } from "~/routes";
import Layout from "~/routes/receivePayment/receiveIov/components";
import { history } from "~/store";
import selector, { SelectorProps } from "./selector";

class RecieveIov extends React.Component<SelectorProps> {
  public readonly onReceiveExternal = () => {
    history.push(RECEIVE_FROM_NON_IOV_USER);
  };

  public render(): JSX.Element {
    const { accountName } = this.props;
    const iovAddress = accountName ? `${accountName}${IOV_NAMESPACE}` : "--";

    return (
      <PageMenu phoneFullWidth>
        <Layout iovAddress={iovAddress} />
        <Block>
          <Typography variant="subtitle1" align="center">Receiving from outside IOV?</Typography>
          <Link to={RECEIVE_FROM_NON_IOV_USER}>
            <Typography variant="subtitle1" align="center" underlined color="primary">View your address</Typography>
          </Link>
        </Block>
      </PageMenu>
    );
  }
}

export default connect(selector)(RecieveIov);
