import { MuiThemeProvider } from "@material-ui/core/styles";
import * as React from "react";
import { Provider } from "react-redux";
import WebFont from "webfontloader";
import theme from "~/theme/mui";

import { makeStore } from "../store";
import Route from "./routes";

const store = makeStore();

WebFont.load({
  google: {
    families: [
      "Open Sans:300,400,500,600,700",
      "Muli:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i",
    ],
  },
});

class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
        <Route />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
