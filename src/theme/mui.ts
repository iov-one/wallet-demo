import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import { error, lightFont, primary, regularFont, secondary, semiBoldFont, sm } from "~/theme/variables";

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

export const themeObject: ThemeOptions = {
  typography: {
    useNextVariants: true,
    fontFamily: "Muli",
    fontSize: 14,
    fontWeightLight: lightFont,
    fontWeightRegular: regularFont,
    fontWeightMedium: semiBoldFont,
  },
  overrides: {
    MuiCheckbox: {
      root: {
        padding: `0 ${sm} 0 0`,
      },
    },
    MuiTypography: {
      body1: {
        fontSize: "1rem",
      },
    },
    MuiButton: {
      root: {
        textTransform: "capitalize",
      },
      contained: {
        boxShadow: "none",
      },
      containedPrimary: {
        color: "#ffffff",
      },
    },
  },
  props: {},
  palette,
};

export default createMuiTheme(themeObject);
