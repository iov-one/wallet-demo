import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from 'redux';

import { CounterState, incrementCounter } from "../../counter";
import { RootActions, RootState } from "../../store";

export interface CounterProps {
    readonly count: CounterState;
    readonly onIncrement: () => any;
}

export class Counter extends React.Component<CounterProps, {}> {
    public render(): JSX.Element {
        return (
            <div>
                <h1>Welcome Counter</h1>
                <span>Number of smiles today: {this.props.count} </span>
                <button type="button" onClick={this.props.onIncrement}> Smile Again </button>
            </div>
        );
    }
}

// note how this verifies that we properly extracted the data
const mapStateToProps = (state: RootState) => ({
    count: state.counter,
});

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) => bindActionCreators({
    onIncrement: incrementCounter,
}, dispatch);
  

export const CounterContainer = connect(mapStateToProps, mapDispatchToProps)(Counter);