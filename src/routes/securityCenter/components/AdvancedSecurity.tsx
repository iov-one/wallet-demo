import React from "react";
import { Alert } from "~/components/layout/dialogs";
import ComingSoonIcon from "../assets/coming_soon.svg";

interface Props {
  readonly showAdvancedSecurity: boolean;
  readonly closeAdvancedSecurity: () => void;
}

export default ({ showAdvancedSecurity, closeAdvancedSecurity }: Props): JSX.Element => (
  <Alert
    icon={ComingSoonIcon}
    title="Coming soon..."
    showDialog={showAdvancedSecurity}
    onClose={closeAdvancedSecurity}
  >
    <React.Fragment>Extra security is something we’re working on, stay tuned!</React.Fragment>
  </Alert>
);
