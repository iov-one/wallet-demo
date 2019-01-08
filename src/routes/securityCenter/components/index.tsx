import * as React from "react";
import { CHANGE_PASSWORD_ROUTE, RECOVERY_PHRASE_ROUTE } from "~/routes";
import BPIcon from "../assets/backupPhrase.svg";
import PswIcon from "../assets/password.svg";
import ExtraSecurity from "./ExtraSecurity";
import SecurityCard from "./ItemCard";
import PageTitle from "./PageTitle";

export default (): JSX.Element => {
  return (
    <React.Fragment>
      <PageTitle />
      <SecurityCard title="Set a password" action="Change" link={CHANGE_PASSWORD_ROUTE} icon={PswIcon} />
      <SecurityCard
        title="Your recovery phrase"
        action="View phrase"
        link={RECOVERY_PHRASE_ROUTE}
        icon={BPIcon}
      />
      <ExtraSecurity />
    </React.Fragment>
  );
};
