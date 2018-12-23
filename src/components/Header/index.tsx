import * as React from "react";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import { PendingNotificationItemProps } from "~/reducers/notification";
import DesktopHeader from "./DesktopHeader";
import PhoneHeader from "./PhoneHeader";

interface Props {
  readonly pendingTxs: ReadonlyArray<PendingNotificationItemProps>;
}

class Header extends React.Component<Props> {
  public render(): JSX.Element {
    const { pendingTxs } = this.props;

    return (
      <MatchMediaContext.Consumer>
        {phone => (phone ? <PhoneHeader /> : <DesktopHeader pendingTxs={pendingTxs} />)}
      </MatchMediaContext.Consumer>
    );
  }
}

export default Header;
