import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeOptions } from "@material-ui/core/styles/createMuiTheme";
import {
  border,
  fontColor,
  lightFont,
  placeholder,
  primary,
  regularFont,
  secondary,
  semiBoldFont,
  sm,
  smallFontSize,
  temporaryError,
} from "~/theme/variables";

const palette = {
  primary: {
    main: primary,
  },
  secondary: {
    main: secondary,
  },
  error: {
    main: temporaryError,
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
      sizeLarge: {
        minHeight: "50px",
      }
    },
    MuiCheckbox: {
      root: {
        padding: `0 ${sm} 0 0`,
        color: secondaryDegraded,
      },
    },
    MuiFormHelperText: {
      root: {
        fontWeight: semiBoldFont,
        fontSize: smallFontSize,
        lineHeight: "18px",
      },
      contained: {
        margin: `${sm} 0 0 0`,
      },
    },
    MuiInputBase: {
      root: {
        fontSize: "1.25rem",
        lineHeight: "1.6rem",
        "& > input::placeholder": {
          color: placeholder,
          // opacity: "1 !important", Fixed in general css for avoid TS errors
        },
      },
      error: {
        backgroundColor: "#fff1e1", // lighter version of temporaryError
      },
    },
    MuiOutlinedInput: {
      input: {
        padding: "12px 15px 13px 12px",
      },
      root: {
        "&:hover:not($disabled):not($focused):not($error) $notchedOutline": {
          borderColor: border,
        },
        "& $notchedOutline": {
          borderColor: border,
          borderWidth: "1px",
        },
      },
    },
    MuiTypography: {
      // @ts-ignore: type def does not recognise this prop. Probably outdated.
      colorTextPrimary: {
        color: fontColor,
      },
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
        fontWeight: lightFont,
        color: fontColor,
      },
      h5: {
        fontSize: "2rem",
      },
      h6: {
        fontSize: "1.25rem",
        color: fontColor,
      },
      body1: {
        fontSize: "1rem",
        color: fontColor,
      },
      subtitle2: {
        fontSize: "0.875rem",
        lineHeight: "0.875rem",
        color: fontColor,
      },
    },
  },
  props: {},
  palette,
};

export default createMuiTheme(themeObject);
