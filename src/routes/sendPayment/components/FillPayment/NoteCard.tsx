import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { lengthLowerThan } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import { background, md, mediumFontSize } from "~/theme/variables";
import note from "../../assets/note.svg";

export const NOTE_FIELD = "note";
const NOTE_MAX_SIZE = 150;

interface Props extends WithStyles<typeof styles> { }

const styles = createStyles({
  resize: {
    fontSize: `${mediumFontSize} !important`,
  },
  card: {
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
  },
  inner: {
    display: "flex",
    alignItems: "center",
  },
  textRoot: {
    padding: `0 ${md}`,
  },
});

const NoteCard = ({ classes }: Props): JSX.Element => {
  const inputRootProps = {
    classes: {
      input: classes.resize,
      root: classes.textRoot,
    },
    disableUnderline: true,
  };

  return (
    <React.Fragment>
      <Block margin="xl" />
      <Block padding="lg" className={classes.inner}>
        <Img src={note} width={15} height={15} alt="Note icon" />
        <Field
          name={NOTE_FIELD}
          InputProps={inputRootProps}
          type="text"
          multiline
          fullWidth
          component={TextField}
          validate={lengthLowerThan(NOTE_MAX_SIZE)}
          placeholder="Add a note"
        />
      </Block>
      <Block margin="xl" />
    </React.Fragment>
  );
}

export default withStyles(styles)(NoteCard);
