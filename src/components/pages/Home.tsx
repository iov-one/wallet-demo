// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import * as React from "react";
import { Link } from "react-router-dom";
import { NextButton } from "../subComponents/buttons";

export class Home extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <div>
        <h1>Welcome To Home</h1>
        <Link to="/counter/">To CounterPage</Link>
        <NextButton title="Continue" onClick={() => {}} />
      </div>
    );
  }
}
