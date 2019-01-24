import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import * as React from "react";
import Block from "~/components/layout/Block";
import Grid from "~/components/layout/Grid";
import GridItem from "~/components/layout/GridItem";
import Typography from "~/components/layout/Typography";
import { SelectFieldItem } from "./index";

const style = {
  minWidth: "100%",
  boxShadow: "none",
};

interface ListItemProps {
  readonly action: (value: SelectFieldItem) => () => void;
  readonly phone: boolean;
  readonly items: ReadonlyArray<SelectFieldItem>;
  readonly align: "left" | "right";
}
const ListItems = ({ phone, action, items, align }: ListItemProps) => {
  return (
    <List disablePadding component="nav" style={style}>
      {items.map(item => (
        <ListItem key={item.label} disableGutters button onClick={action(item)}>
          <ListItemText disableTypography>
            <Block padding="sm">
              <Grid>
                <GridItem xs={4} md={2}>
                  <Typography align={align} variant={phone ? "body1" : "body2"}>
                    {item.label}
                  </Typography>
                </GridItem>
                <GridItem xs={8} md={10}>
                  <Typography align={align} variant={phone ? "body1" : "body2"}>
                    {item.description}
                  </Typography>
                </GridItem>
              </Grid>
            </Block>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default ListItems;
