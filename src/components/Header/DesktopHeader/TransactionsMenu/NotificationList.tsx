import CircularProgress from "@material-ui/core/CircularProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import noPendingTxs from "~/components/Header/assets/noPendingTxs.svg";
import Hairline from "~/components/layout/Hairline";
import EmptyListIcon from "~/components/templates/menu/EmptyListIcon";
import { PendingNotificationItemProps } from "~/reducers/notification";
import { border } from "~/theme/variables";

interface Props {
  readonly items: ReadonlyArray<PendingNotificationItemProps>;
}

const Notifications = ({ items }: Props) => {
  const hasItems = items.length > 0;

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText primary="Notifications" />
      </ListItem>
      <Hairline color={border} />
      {hasItems ? (
        items.map((item: PendingNotificationItemProps) => (
          <React.Fragment>
            <ListItem>
              <CircularProgress />
              <ListItemText
                primary={`${item.amount.whole}.${item.amount.fractional} to ${item.receiver}`}
                secondary="... Sending"
              />
            </ListItem>
            <Hairline />
          </React.Fragment>
        ))
      ) : (
        <EmptyListIcon src={noPendingTxs} alt="No Pending Transactions" text="You are up to date!" />
      )}
    </React.Fragment>
  );
};

export default Notifications;
