import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import Block from "~/components/layout/Block";
import Hairline from "~/components/layout/Hairline";
import Img from "~/components/layout/Image";
import Typography from "~/components/layout/Typography";
import selectedTick from "./assets/selectedTick.svg";
import { Item } from "./index";

const style = {
  minWidth: "100%",
  boxShadow: "none",
};

interface ListItemProps {
  readonly action: (value: Item) => () => void;
  readonly phone: boolean;
  readonly selectedItem: string;
  readonly items: ReadonlyArray<Item>;
  readonly align: "left" | "right";
}

const ListItems = ({ phone, action, items, align, selectedItem }: ListItemProps) => {
  return (
    <List component="nav" style={style}>
      {items.map(item => (
        <Block key={item.name}>
          <ListItem key={item.name} button onClick={action(item)}>
            <ListItemText
              disableTypography
              primary={
                <Typography align={align} variant={phone ? "body1" : "body2"}>
                  {item.name}
                </Typography>
              }
              secondary={<Typography color="textSecondary">{item.additionalText}</Typography>}
            />
            {item.name === selectedItem && (
              <Img src={selectedTick} alt="Selected Ticker" width={24} height={24} />
            )}
          </ListItem>
          <Hairline />
        </Block>
      ))}
    </List>
  );
};

export default ListItems;
