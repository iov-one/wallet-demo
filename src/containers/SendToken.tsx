// tslint:disable:no-empty
// TODO: remove above comment when the empty onClick is gone
import { TokenTicker } from "@iov/bcp-types";
import * as React from "react";
import { withRouter } from "react-router";

import { PageStructure } from "../components/compoundComponents/page";
import { SendTokenForm } from "../components/templates/forms";

class SendToken extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <PageStructure whiteBg>
        <SendTokenForm
          name="victor*iov.value"
          balance={{
            whole: 10,
            fractional: 0,
            tokenTicker: "IOV" as TokenTicker,
          }}
        />
      </PageStructure>
    );
  }
}

export const SendTokenPage = withRouter(SendToken);
