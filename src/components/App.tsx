import * as React from "react";
import { Provider } from "react-redux";

import { store } from "../store";
import Route from "./routes";

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
