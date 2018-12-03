import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import Typography from "~/components/layout/Typography";
import { themeObject } from "~/theme/mui";

const Typographies = () => (
  <React.Fragment>
    <Typography component="h2" variant="h1" gutterBottom>
      h1. Heading
    </Typography>
    <Typography variant="h2" gutterBottom>
      h2. Heading
    </Typography>
    <Typography variant="h3" gutterBottom>
      h3. Heading
    </Typography>
    <Typography variant="h4" gutterBottom>
      h4. Heading
    </Typography>
    <Typography variant="h5" gutterBottom>
      h5. Heading
    </Typography>
    <Typography variant="h6" gutterBottom>
      h6. Heading
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>
    <Typography variant="subtitle2" gutterBottom>
      subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
    </Typography>
    <Typography variant="body1" gutterBottom>
      body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit,
      quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat
      deleniti? Eum quasi quidem quibusdam.
    </Typography>
    <Typography variant="body2" gutterBottom>
      body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit,
      quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat
      deleniti? Eum quasi quidem quibusdam.
    </Typography>
    <Typography variant="button" gutterBottom>
      button text
    </Typography>
    <Typography variant="caption" gutterBottom>
      caption text
    </Typography>
    <Typography variant="overline" gutterBottom>
      overline text
    </Typography>
  </React.Fragment>
);

storiesOf("Components /typography", module)
  .add("Variants 12px seed", () => {
    const theme = createMuiTheme({ ...themeObject, typography: { fontSize: 12 } });

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Typographies />
        </MuiThemeProvider>
      </React.Fragment>
    );
  })
  .add("Variants 13px seed", () => {
    const theme = createMuiTheme({ ...themeObject, typography: { fontSize: 13 } });

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Typographies />
        </MuiThemeProvider>
      </React.Fragment>
    );
  })
  .add("Variants 14px seed", () => {
    const theme = createMuiTheme({ ...themeObject, typography: { fontSize: 14 } });

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Typographies />
        </MuiThemeProvider>
      </React.Fragment>
    );
  })
  .add("Variants 15px seed", () => {
    const theme = createMuiTheme({ ...themeObject, typography: { fontSize: 15 } });

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Typographies />
        </MuiThemeProvider>
      </React.Fragment>
    );
  })
  .add("Variants 16px seed", () => {
    const theme = createMuiTheme({ ...themeObject, typography: { fontSize: 16 } });

    return (
      <React.Fragment>
        <MuiThemeProvider theme={theme}>
          <Typographies />
        </MuiThemeProvider>
      </React.Fragment>
    );
  });
