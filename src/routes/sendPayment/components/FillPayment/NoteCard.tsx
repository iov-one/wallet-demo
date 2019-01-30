import { createStyles, WithStyles, withStyles } from "@material-ui/core";
import * as React from "react";
import Field from "~/components/forms/Field";
import TextField from "~/components/forms/TextField";
import { lengthLowerThan } from "~/components/forms/validator";
import Block from "~/components/layout/Block";
import Img from "~/components/layout/Image";
import { background, md, mediumFontSize } from "~/theme/variables";
import note from "../../assets/note.svg";
import SendCard from "./SendCard";

export const NOTE_FIELD = "note";
const NOTE_MAX_SIZE = 150;

interface Props extends WithStyles<typeof styles> {}

const styles = createStyles({
  noteField: {
    "& * fieldset": {
      border: "0 !important",
    },
  },
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

const NoteCard = ({ classes }: Props): JSX.Element => (
  <SendCard>
    <Block margin="xl" />
    <Block padding="lg" className={classes.inner}>
      <Img src={note} width={15} height={15} alt="Note icon" />
      <Field
        variant="outlined"
        name={NOTE_FIELD}
        className={classes.noteField}
        InputProps={{
          classes: {
            input: classes.resize,
            root: classes.textRoot,
          },
        }}
        type="text"
        multiline
        fullWidth
        component={TextField}
        validate={lengthLowerThan(NOTE_MAX_SIZE)}
        placeholder="Add a note"
      />
    </Block>
    <Block margin="xl" />
  </SendCard>
);

export default withStyles(styles)(NoteCard);
