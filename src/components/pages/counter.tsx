import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";

import { CounterState, incrementCounter } from "../../reducers/counter";
import { RootActions, RootState } from "../../reducers/index";

export interface CounterProps {
  readonly count: CounterState;
  readonly onIncrement: () => any;
}

export class Counter extends React.Component<CounterProps, {}> {
  public render(): JSX.Element {
    const { count, onIncrement } = this.props;
    return (
      <div>
        <h1>Welcome Counter</h1>
        <span>Number of smiles today: {count} </span>
        <button type="button" onClick={onIncrement}>
          {" "}
          Smile Again{" "}
        </button>
        <br />
        <Link to="/">Back to HomePage</Link>
      </div>
    );
  }
}

// note how this verifies that we properly extracted the data
const mapStateToProps = (state: RootState) => ({ count: state.counter });

const mapDispatchToProps = (dispatch: Dispatch<RootActions>) =>
  bindActionCreators({ onIncrement: incrementCounter }, dispatch);

export const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
