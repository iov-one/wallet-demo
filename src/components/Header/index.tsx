import * as React from "react";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { TransNotificationInfo } from "~/logic";
import { PendingNotificationItemProps } from "~/reducers/notification";
import DesktopHeader from "./DesktopHeader";
import PhoneHeader from "./PhoneHeader";

interface Props {
  readonly pendingTxs: ReadonlyArray<PendingNotificationItemProps>;
  readonly txs: ReadonlyArray<TransNotificationInfo>;
}

class Header extends React.Component<Props> {
  public render(): JSX.Element {
    const { pendingTxs, txs } = this.props;

    return (
      <MatchMediaContext.Consumer>
        {phone => (phone ? <PhoneHeader /> : <DesktopHeader pendingTxs={pendingTxs} txs={txs} />)}
      </MatchMediaContext.Consumer>
    );
  }
}

export default Header;
