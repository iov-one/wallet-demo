import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Navigation } from "../src/components/subComponents/headers";

storiesOf("Header", module)
  .add("Navigation", () => {
    const items = ["Balance", "Payments"];
    return <Navigation items={items} />;
  })
  .add("Navigation with active item", () => {
    const items = ["Balance", "Payments"];
    return <Navigation items={items} activeItem="Payments" />;
  });
