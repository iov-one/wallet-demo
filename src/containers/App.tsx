import * as React from "react";
import { Provider } from "react-redux";
import WebFont from "webfontloader";

import { makeStore } from "../store";
import Route from "./routes";

const store = makeStore();

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
