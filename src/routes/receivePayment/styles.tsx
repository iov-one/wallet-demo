import { createStyles } from "@material-ui/core";
import { background, card, md } from "~/theme/variables";

export const styles = createStyles({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    backgroundColor: background,
    display: "flex",
    flexDirection: "column",
    flexBasis: card,
    maxWidth: card,
  },
  tooltip: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  field: {
    marginRight: md,
  }
});
