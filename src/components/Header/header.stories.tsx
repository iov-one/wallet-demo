import { storiesOf } from "@storybook/react";
import * as React from "react";
import { MatchMediaContext } from "~/context/MatchMediaContext";
import Header from "./index";

storiesOf("Components /header", module).add("Header for desktop", () => (
  <MatchMediaContext.Provider value={false}>
    <div style={{ height: "300px", backgroundColor: "grey" }}>
      <Header />
    </div>
  </MatchMediaContext.Provider>
));
