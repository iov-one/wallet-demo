import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Typography from "~/components/layout/Typography";
import { Item } from "./index";

const style = {
  minWidth: "100%",
  boxShadow: "none",
};

interface ListItemProps {
  readonly action: (value: Item) => () => void;
  readonly phone: boolean;
  readonly items: ReadonlyArray<Item>;
  readonly align: "left" | "right";
}
const ListItems = ({ phone, action, items, align }: ListItemProps) => {
  return (
    <List disablePadding component="nav" style={style}>
      {items.map(item => (
        <ListItem key={item.name} disableGutters button onClick={action(item)}>
          <ListItemText disableTypography>
            <Block padding={!phone ? "sm" : undefined}>
              <Grid>
                <GridItem xs={12} sm={3}>
                  <Typography align={align} inline variant={phone ? "body1" : "body2"}>
                    {item.name}
                  </Typography>
                </GridItem>
                { item.additionalText && <GridItem xs={12} sm={9}>
                  <Typography align={align} inline variant="body2">
                    {item.additionalText}
                  </Typography>
                </GridItem> }
              </Grid>
            </Block>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ListItems;
