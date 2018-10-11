import React from "react";

import { storiesOf } from "@storybook/react";

import { NormalHeader } from "../src/components/subComponents/headers";

storiesOf("Headers", module).add("Normal Header", () => <NormalHeader />);
