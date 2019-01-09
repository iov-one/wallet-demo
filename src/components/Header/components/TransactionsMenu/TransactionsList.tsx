import CircularProgress from "@material-ui/core/CircularProgress";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import noPendingTxs from "~/components/Header/assets/noPendingTxs.svg";
import { HeaderPendingTxProps } from "~/components/Header/selector";
import Hairline from "~/components/layout/Hairline";
import EmptyListIcon from "~/components/templates/menu/EmptyListIcon";
import { border } from "~/theme/variables";

interface Props {
  readonly items: ReadonlyArray<HeaderPendingTxProps>;
}

const Transactions = ({ items }: Props) => {
  const hasItems = items.length > 0;

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText primary="Pending Transactions" />
      </ListItem>
      <Hairline color={border} />
      {hasItems ? (
        items.map((item: HeaderPendingTxProps, index: number) => {
          const { amount, receiver } = item;
          const lastOne = index + 1 === items.length;

          return (
            <React.Fragment key={item.id}>
              <ListItem>
                <CircularProgress size={30} />
                <ListItemText primary={`${amount} to ${receiver}`} secondary="... Sending" />
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

export default Transactions;
