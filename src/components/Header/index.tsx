import * as React from "react";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import DesktopHeader from "./DesktopHeader";
import PhoneHeader from "./PhoneHeader";

class Header extends React.Component {
  public render(): JSX.Element {
    return (
      <MatchMediaContext.Consumer>
        {phone => (phone ? <PhoneHeader /> : <DesktopHeader />)}
      </MatchMediaContext.Consumer>
    );
  }
}

export default Header;
