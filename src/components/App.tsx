import * as React from "react";
import { Provider } from "react-redux";

import { store } from "../store";
import { CounterContainer } from "./pages";

class App extends React.Component<{}, {}> {
    public render(): JSX.Element {
        return (
            <Provider store={store}>
                <CounterContainer />
            </Provider>
        );
    }
}

export default App;
