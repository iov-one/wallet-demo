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
        items.map((item: PendingNotificationItemProps, index: number) => {
          const lastOne = index + 1 === items.length;

          return (
            <React.Fragment>
              <ListItem>
                <CircularProgress size={30} />
                <ListItemText
                  primary={`${item.amount.whole}.${item.amount.fractional} ${item.amount.tokenTicker} to ${
                    item.receiver
                  }`}
                  secondary="... Sending"
                />
              </ListItem>
              {!lastOne && <Hairline />}
            </React.Fragment>
          );
        })
      ) : (
        <EmptyListIcon src={noPendingTxs} alt="No Pending Transactions" text="You are up to date!" />
      )}
    </React.Fragment>
  );
};

export default Notifications;
