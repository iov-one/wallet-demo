import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { Navigation, HeaderIcon, HeaderDropdown } from "../src/components/subComponents/headers";
import { Header } from "../src/components/compoundComponents/header";

storiesOf("Header", module)
  .add("Navigation", () => {
    const items = ["Balance", "Payments"];
    return <Navigation items={items} />;
  })
  .add("Navigation with active item", () => {
    const items = ["Balance", "Payments"];
    return <Navigation items={items} activeItem="Payments" />;
  })
  .add("Header Icons", () => (
    <div>
      <HeaderIcon icon="bell" /> <HeaderIcon icon="bell" active />
      <HeaderIcon icon="loading" /> <HeaderIcon icon="loading" active />
    </div>
  ))
  .add("Header Dropdown", () => <HeaderDropdown title="Hi!" />)
  .add("Header", () => <Header />);
