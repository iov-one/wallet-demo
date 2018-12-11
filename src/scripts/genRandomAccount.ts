import { bnsCodec } from "@iov/bns";
import { Bip39, Random } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";
import { Ed25519HdWallet, HdPaths } from "@iov/keycontrol";

async function genAccount(): Promise<void> {
  const entropy = await Random.getBytes(16);
  const mnemonic = Bip39.encode(entropy).asString();
  console.log("mnemonic:");
  console.log(mnemonic);
  console.log("");
  const keyring = Ed25519HdWallet.fromMnemonic(mnemonic);
  for (let idx = 0; idx < 10; idx++) {
    const ident = await keyring.createIdentity(HdPaths.simpleAddress(idx));
    const addr = bnsCodec.keyToAddress(ident.pubkey);
    const hex = Encoding.toHex(Bech32.decode(addr).data);
    console.log(`${idx}:   ${addr} / ${hex}`);
  }
}

genAccount();
