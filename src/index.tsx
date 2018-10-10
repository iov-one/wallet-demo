import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./components/App";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("app"),
  );
};

render(App);

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    render(App);
  });
}
