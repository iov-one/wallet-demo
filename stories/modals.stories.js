import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import { ReceiveModal } from "../src/components/templates/modal";

storiesOf("Modals", module).add("Receive Modal", () => (
  <ReceiveModal name="victor*iov.one" visible="true" address="Test Address" />
));
