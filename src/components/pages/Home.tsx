import * as React from "react";
import { Link } from "react-router-dom";

export class Home extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <div>
        <h1>Welcome To Home</h1>
        <Link to="/counter/">To CounterPage</Link>
      </div>
    );
  }
}
