import { ProcessedTx } from "~/store/notifications/state";

export const LAST_TX = "LAST_TX";

export function getLastTx(): ProcessedTx | null {
  const lastTxJson = localStorage.getItem(LAST_TX);
  if (lastTxJson) {
    return JSON.parse(lastTxJson);
  }

  return null;
}

export function storeLastTx(lastTx: ProcessedTx): void {
  localStorage.setItem(LAST_TX, JSON.stringify(lastTx));
}
