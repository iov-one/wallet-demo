import { createStyles, InputBase, WithStyles, withStyles } from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import Img from "~/components/layout/Image";
//import selectChevron from "./assets/selectChevron.svg";

const styles = createStyles({
  root: {
    height: "32px",
  },
  input: {
    paddingLeft: 0,
    paddingRight: 0,
    cursor: "pointer",
  },
});

interface SelectInputProps extends WithStyles<typeof styles> {
  readonly value: string;
  readonly chevronWidth: number;
  readonly chevronHeight: number;
  readonly rootClassNames: string;
  readonly inputClassNames: string;
  readonly inputProps: any;
  readonly selectChevron: string;
}
const SelectInputField = ({
  value,
  inputProps,
  classes,
  selectChevron,
  chevronWidth,
  chevronHeight,
  rootClassNames,
  inputClassNames,
}: SelectInputProps) => {
  const inputClasses = {
    root: classNames(classes.root, rootClassNames),
    input: classNames(classes.input, inputClassNames),
  };

  return (
    <React.Fragment>
      <InputBase
        name={name}
        classes={inputClasses}
        inputProps={inputProps}
        value={value}
        readOnly
        role="button"
      />
      <Img noShrink src={selectChevron} alt="Phone Menu" width={chevronWidth} height={chevronHeight} />
    </React.Fragment>
  );
};

export default withStyles(styles)(SelectInputField) as any;
