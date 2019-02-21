import { storiesOf } from "@storybook/react";
import * as React from "react";
import { RootMatchMedia } from "~/utils/storybook";
import ReceiveNonIov from "./index";
import { TickerWithAddress} from "./selector";

const tickerList: ReadonlyArray<TickerWithAddress> = [
  {
    address: "123",
    name:"a",
  }
];

storiesOf("Routes /receive-external", module)
  .add("Receive tokens from NON iov address for desktop", () => (
    <RootMatchMedia matchMedia={false}>
      <ReceiveNonIov tickersList={tickerList}/>
    </RootMatchMedia>
  ))
  .add("Receive tokens from NON iov address for phones", () => (
    <div style={{ display: "flex", flexDirection: "column", width: "425px" }}>
      <RootMatchMedia matchMedia={true}>
        <ReceiveNonIov />
      </RootMatchMedia>
    </div>
  ));
