export const LAST_TX_ID = "LAST_TX_ID";

export function getLastTx(): string | null {
  return localStorage.getItem(LAST_TX_ID);
}

export function storeLastTx(lastTxId: string): void {
  localStorage.setItem(LAST_TX_ID, lastTxId);
}
