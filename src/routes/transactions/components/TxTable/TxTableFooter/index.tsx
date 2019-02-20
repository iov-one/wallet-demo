import { createStyles, withStyles, WithStyles } from "@material-ui/core";
import * as React from "react";
import Field from "~/components/forms/Field";
import SelectField, { Item } from "~/components/forms/SelectField";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import Spacer from "~/components/layout/Spacer";
import Typography from "~/components/layout/Typography";
import arrowLeft from "../../../assets/arrowLeft.svg";
import arrowRight from "../../../assets/arrowRight.svg";

const styles = createStyles({
  footer: {
    display: "flex",
    alignItems: "center",
  },
});

interface Props extends WithStyles<typeof styles> {
  readonly phone?: boolean;
  readonly phoneHook: HTMLDivElement | null;
  readonly onChangeRows: (item: Item) => void;
  readonly onPrevPage: () => void;
  readonly onNextPage: () => void;
}

const rowsSelectorData: ReadonlyArray<Item> = [{ name: "5" }, { name: "10" }, { name: "25" }, { name: "50" }];

const TxTableFooter = ({ classes, phone, phoneHook, onChangeRows, onPrevPage, onNextPage }: Props) => {
  return (
    <React.Fragment>
      <Block margin="md" />
      <Block padding="lg" className={classes.footer}>
        {!phone && <Spacer order={1} />}
        <Typography variant="subtitle2" weight="regular">
          Rows per page
        </Typography>
        <Block padding="xs" />
        <Field
          name="rows-per-page"
          component={SelectField}
          phoneHook={phoneHook}
          onChangeCallback={onChangeRows}
          items={rowsSelectorData}
          initial="5"
          width={60}
        />
        {phone && <Spacer order={1} />}
        <Img src={arrowLeft} alt="Previous page" width={40} height={40} onClick={onPrevPage} />
        <Img src={arrowRight} alt="Next page" width={40} height={40} onClick={onNextPage} />
      </Block>
      <Block margin="md" />
    </React.Fragment>
  );
};

export default withStyles(styles)(TxTableFooter);
