import { TokenTicker } from "@iov/core";
import { randomString } from "~/logic/testhelpers";
import { HeaderComponent, Props } from "../index";

describe("Component -> Header -> HeaderComponent", () => {
  let component: HeaderComponent;
  let props: Props;
  let txIdStorage: string;

  beforeEach(() => {
    txIdStorage = randomString(16);

    props = {
      classes: {
        root: "",
      },
      pendingTxs: [],
      txs: [],
      lastTx: {
        id: txIdStorage,
        time: new Date(Date.now()),
        received: true,
        amount: { quantity: "100000", fractionalDigits: 0, tokenTicker: "IOV" as TokenTicker },
        signer: randomString(16),
        recipient: randomString(16),
        success: true,
      },
      phoneMode: false,
    };

    component = new HeaderComponent(props);
  });

  it("should not show badge in case if no transactions", () => {
    expect(component.calcBellBadgeState(undefined, null)).toEqual({ showBadge: false, color: "error" });
  });

  it("should not show badge in case if newest transaction equals in localStorage", () => {
    expect(component.calcBellBadgeState(props.lastTx, txIdStorage)).toEqual({
      showBadge: false,
      lastTx: props.lastTx,
      color: "error",
    });
  });

  it("should show badge if localStorage empty and transaction exists", () => {
    expect(component.calcBellBadgeState(props.lastTx, null)).toEqual({
      showBadge: true,
      lastTx: props.lastTx,
      color: "primary",
    });
  });

  it("should show badge in case if newest transaction not in localStorage", () => {
    expect(component.calcBellBadgeState(props.lastTx, randomString(16))).toEqual({
      showBadge: true,
      lastTx: props.lastTx,
      color: "primary",
    });
  });
});
