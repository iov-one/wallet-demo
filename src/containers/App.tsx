import { MuiThemeProvider } from "@material-ui/core/styles";
import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import WebFont from "webfontloader";
import theme from "~/theme/mui";

import { history, makeStore } from "../store";
import Route from "./routes";

const store = makeStore();

WebFont.load({
  google: {
    families: ["Muli:200,300,400,600"],
  },
});

class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <Route />
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
