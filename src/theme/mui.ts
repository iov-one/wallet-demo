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

const secondaryDegraded = "rgba(111, 116, 154, 0.47)";

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
        color: secondaryDegraded,
      },
    },
    MuiTypography: {
      colorTextSecondary: {
        color: secondaryDegraded,
      },
      h1: {
        fontSize: "7rem",
      },
      h2: {
        fontSize: "4.25rem",
      },
      h3: {
        fontSize: "3.25rem",
      },
      h4: {
        fontSize: "2.5rem",
      },
      h5: {
        fontSize: "2rem",
      },
      h6: {
        fontSize: "1.25rem",
      },
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
