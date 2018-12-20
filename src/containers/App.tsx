import { MuiThemeProvider } from "@material-ui/core/styles";
import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { Provider } from "react-redux";
import WebFont from "webfontloader";
import Route from "~/routes";
import theme from "~/theme/mui";

import { history, makeStore } from "../store";

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
        <MuiThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Route state={store.getState()} />
          </ConnectedRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
