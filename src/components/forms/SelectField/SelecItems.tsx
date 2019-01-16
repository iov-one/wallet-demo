import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import Block from "~/components/layout/Block";
import Typography from "~/components/layout/Typography";

const style = {
  minWidth: "100%",
  boxShadow: "none",
};

interface ListItemProps {
  readonly action: (value: string) => () => void;
  readonly phone: boolean;
  readonly items: ReadonlyArray<string>;
  readonly align: "left" | "right"
}
const ListItems = ({ phone, action, items, align }: ListItemProps) => {
  return (
    <List disablePadding component="nav" style={style}>
      {items.map(item => (
        <ListItem key={item} disableGutters button onClick={action(item)}>
          <ListItemText disableTypography>
            <Block padding="sm">
              <Typography align={align} variant={phone ? "body1" : "body2"}>{item}</Typography>
            </Block>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ListItems;
