import { createStyles, MenuItem, Select, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import { lg, md, secondary, smallFontSize } from "~/theme/variables";
import arrowLeft from "../assets/arrowLeft.svg";
import arrowRight from "../assets/arrowRight.svg";

const styles = createStyles({
  selectIcon: {
    color: secondary,
  },
  selectRoot: {
    fontSize: smallFontSize,
  },
  select: {
    paddingRight: lg,
    paddingLeft: md,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    margin: `${md} 0`,
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly phone?: boolean;
  readonly rowsPerPage: number;
  readonly rowsChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TransactionTableFooter = ({ classes, rowsChange, rowsPerPage, phone }: Props) => {
  const selectClasses = {
    icon: classes.selectIcon,
    root: classes.selectRoot,
    select: classes.select,
  };

  return (
    <Block padding="lg" className={classes.footer}>
      {!phone && <Spacer order={1} />}
      <Typography variant="subtitle2" weight="regular">
        Rows per page
      </Typography>
      <Select
        value={rowsPerPage}
        onChange={rowsChange}
        classes={selectClasses}
        disableUnderline
        inputProps={{
          name: "rows-per-page",
          id: "rows-per-page",
        }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
      </Select>
      {phone && <Spacer order={1} />}
      <Img src={arrowLeft} alt="Previous page" />
      <Img src={arrowRight} alt="Next page" />
    </Block>
  );
};

export default withStyles(styles)(TransactionTableFooter);
