import { createMuiTheme } from "@material-ui/core/styles";
import { error, lightFont, primary, regularFont, secondary, semiBoldFont } from "~/theme/variables";

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
    useNextVariants: true,
    fontFamily: "Muli",
    fontSize: 14,
    fontWeightLight: lightFont,
    fontWeightRegular: regularFont,
    fontWeightMedium: semiBoldFont,
  },
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: '#ffffff',
      },
    },
  },
  props: {},
  palette,
});
