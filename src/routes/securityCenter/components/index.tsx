import * as React from "react";
import { BACKUP_PHRASE_ROUTE, CHANGE_PASSWORD_ROUTE } from "~/routes";
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
        title="View a backup phrase" 
        action="My backup phrase" 
        link={BACKUP_PHRASE_ROUTE} 
        icon={BPIcon} 
      />
      <ExtraSecurity />
    </React.Fragment>
  );
};
