import * as React from "react";
import { connect } from "react-redux";

import { RootState } from "../../store";

export interface CounterProps {
    readonly count: number;
}

export class Counter extends React.Component<CounterProps, {}> {
    public render(): JSX.Element {
        return (
            <div>
                <h1>Welcome Counter</h1>
                <p>Current count is: {this.props.count}</p>
            </div>
        );
    }
}

// note how this verifies that we properly extracted the data
const mapStateToProps = (state: RootState): CounterProps => ({
    count: state.counter,
});

export const CounterContainer = connect(mapStateToProps)(Counter);