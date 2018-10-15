import * as React from "react";
import { Provider } from "react-redux";
import WebFont from "webfontloader";

import { store } from "../store";
import Route from "./routes";

WebFont.load({
  google: {
    families: ["Open Sans:300,400,700"],
  },
});

class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}

export default App;
