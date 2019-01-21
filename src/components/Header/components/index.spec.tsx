import { randomString } from "~/logic/testhelpers";
import { NotificationTx } from "~/store/notifications/state";
import { HeaderComponent, Props } from "./index";

describe("Component -> Header -> HeaderComponent", () => {
  let component: HeaderComponent;
  // tslint:disable-next-line:readonly-array
  let sampleTxData: NotificationTx[];

  beforeEach(() => {
    const props: Props = {
      classes: {
        root: "",
      },
      pendingTxs: [],
      txs: [],
      phoneMode: false,
    };

    const dateNow = new Date(Date.now());
    sampleTxData = [
      { 
        id: randomString(16),
        time: new Date(dateNow.setMinutes(dateNow.getMinutes() + 10)),
        received: true,
        amount: "1000000000",
        signer: randomString(16),
        recipient: randomString(16),
        success: true,
      },
      { 
        id: randomString(16),
        time: new Date(dateNow.setMinutes(dateNow.getMinutes() + 20)),
        received: true,
        amount: "1000000000",
        signer: randomString(16),
        recipient: randomString(16),
        success: true,
      },
      { 
        id: randomString(16),
        time: new Date(dateNow.setMinutes(dateNow.getMinutes() + 30)),
        received: true,
        amount: "1000000000",
        signer: randomString(16),
        recipient: randomString(16),
        success: true,
      }
    ]

    component = new HeaderComponent(props);
  });

  it("should not show badge in case if no transactions", () => {
    expect(component.calcBellBadgeState([], null)).toEqual({ showBadge: false, color: "error" });
  });

  it("should not show badge in case if newest transaction equals in localStorage", () => {
    expect(component.calcBellBadgeState(sampleTxData, sampleTxData[2].id)).toEqual({ showBadge: false, color: "error" });
  });

  it("should show badge if localStorage empty and transactions exists", () => {
    expect(component.calcBellBadgeState(sampleTxData, null)).toEqual({ showBadge: true, color: "primary" });
  });

  it("should show badge in case if newest transaction not in localStorage", () => {
    expect(component.calcBellBadgeState(sampleTxData, sampleTxData[0].id)).toEqual({ showBadge: true, color: "primary" });
  });
});
