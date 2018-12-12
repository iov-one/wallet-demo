import { bnsCodec } from "@iov/bns";
import { Bip39, Random, Slip10RawIndex } from "@iov/crypto";
import { Bech32, Encoding } from "@iov/encoding";
import { Ed25519HdWallet, HdPaths } from "@iov/keycontrol";

async function genAccount(): Promise<void> {
  const entropy = await Random.getBytes(16);
  const mnemonic = Bip39.encode(entropy).asString();
  console.log("mnemonic:");
  console.log(mnemonic);
  console.log("");
  const keyring = Ed25519HdWallet.fromMnemonic(mnemonic);

  console.log("Profile accounts (simpleAddress)");
  for (let idx = 0; idx < 10; idx++) {
    const ident = await keyring.createIdentity(HdPaths.simpleAddress(idx));
    const addr = bnsCodec.keyToAddress(ident.pubkey);
    const hex = Encoding.toHex(Bech32.decode(addr).data);
    console.log(`${idx}:   ${addr} / ${hex}`);
  }
  console.log("\n***\n");

  console.log("Faucet accounts (coinType, see README)");
  for (let idx = 0; idx < 10; idx++) {
    const ident = await keyring.createIdentity(faucetHdPath(idx));
    const addr = bnsCodec.keyToAddress(ident.pubkey);
    const hex = Encoding.toHex(Bech32.decode(addr).data);
    console.log(`${idx}:   ${addr} / ${hex}`);
  }
}

export function faucetHdPath(coinType: number): ReadonlyArray<Slip10RawIndex> {
  const purpose = 1229936198; // big endian of ascii "IOVF"
  const instance = 0;
  const account = 0;
  return [
    Slip10RawIndex.hardened(purpose),
    Slip10RawIndex.hardened(coinType),
    Slip10RawIndex.hardened(instance),
    Slip10RawIndex.hardened(account),
  ];
}

genAccount();
