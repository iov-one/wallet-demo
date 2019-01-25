import { ProcessedTx } from "~/store/notifications/state";
import { getLastTx } from "~/utils/localstorage/transactions";

export interface BadgeProps {
  readonly invisible: boolean;
  readonly color: "default" | "primary" | "error";
}

const hiddenBadge: BadgeProps = {
  invisible: true,
  color: "default",
};

const buildBadgeFrom = (lastTxSucceded: boolean): BadgeProps => ({
  invisible: false,
  color: lastTxSucceded ? "primary" : "error",
})

const lastTxNewer = (lastTx: ProcessedTx, lastStoredTx: ProcessedTx) => {
  return lastTx.time.getTime() > lastStoredTx.time.getTime();
}

export const calcBadgeProps = (lastTx: ProcessedTx | undefined): BadgeProps => {
  if (!lastTx) {
    return hiddenBadge;
  }

  const lastStoredTx: ProcessedTx | null = getLastTx(); 
  if (!lastStoredTx) {
    return buildBadgeFrom(lastTx.success);  
  }
  const isLastTxNewer = lastTxNewer(lastTx, lastStoredTx)
  if (isLastTxNewer) {
    return buildBadgeFrom(lastTx.success)
  }

  return hiddenBadge;
};
