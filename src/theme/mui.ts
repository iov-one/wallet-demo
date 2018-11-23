import { createMuiTheme } from "@material-ui/core/styles";
import { error, primary, secondary,  } from "~/theme/variables";

export type WithStyles = {
  readonly classes: object,
};

const palette = {
  primary: {
    main: primary,
  },
  secondary: {
    main: secondary,
  },
  error: {
    main: error,
  },
  contrastThreshold: 3,
  tonalOffset: 0.2,
};

export default createMuiTheme({
  typography: {
    fontFamily: "Muli",
  },
  overrides: {},
  props: {},
  palette,
});
