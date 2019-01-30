// tslint:disable:no-string-literal
import PseudoRandom from "random-js";

import { BlockchainSpec } from "./connection";
import { createProfile } from "./profile";

import { allFaucetSpecs, loadConfig } from "../utils/conf";

// load some config options
export const testSpec = async () => {
  const config = await loadConfig();
  return config.bns.chainSpec as BlockchainSpec;
};
export const testChains = async () => {
  const config = await loadConfig();
  return config.chains.map(cfg => cfg.chainSpec as BlockchainSpec);
};
export const bnsFaucetSpec = async () => {
  const config = await loadConfig();
  return config.bns.faucetSpec;
};
export const faucetSpecs = async () => {
  const config = await loadConfig();
  return allFaucetSpecs(config);
};

export const skipTests = (envVar: string | undefined): boolean => !envVar;
export const mayTestBns = skipTests(process.env.BNS_ENABLED) ? xit : it;
export const mayTestFull =
  !skipTests(process.env.BNS_ENABLED) && !skipTests(process.env.CHAINS_ENABLED) ? it : xit;

// this is a pre-loaded account we can play with (separate from the faucet)
const adminMnemonic = "echo focus urge holiday vacuum venture tonight ancient list fiscal orchard strong";
export const adminProfile = () => createProfile(adminMnemonic);

const prng: PseudoRandom.Engine = PseudoRandom.engines.mt19937().autoSeed();
const pool = "abcdefghijklmnopqrstuvwxyz0123456789";
export const randomString = (len: number) => PseudoRandom.string(pool)(prng, len);

/*
mnemonic:
echo focus urge holiday vacuum venture tonight ancient list fiscal orchard strong

Profile accounts (iov)
0:   tiov1rgn2hppvvlgtqwl9zynqhxydfhh90jwxxrrcwu / 1a26ab842c67d0b03be511260b988d4dee57c9c6
1:   tiov1y7h0yexn7urg0hvuz3etc4g6c5gkxmc6245hgv / 27aef264d3f70687dd9c1472bc551ac511636f1a
2:   tiov1l02c84h3wm9uudfrkmdlafu8dx9wg32ea2y4hv / fbd583d6f176cbce3523b6dbfea787698ae44559
3:   tiov16vnvjellx9lmpn706uxtrhwafpj7xddzl4q2g9 / d326c967ff317fb0cfcfd70cb1dddd4865e335a2
4:   tiov1t0w24hd9e2v5xrppw0hhnjrd4a4psk0g2rqcpn / 5bdcaadda5ca99430c2173ef79c86daf6a1859e8
5:   tiov1qz47ryuwwa07w078lydq725wwgvgnkcw4lsvfy / 00abe1938e775fe73fc7f91a0f2a8e721889db0e
6:   tiov1tg0tdw3a56k60hnsrd94qy7gkckh6qrsmda6sw / 5a1eb6ba3da6ada7de701b4b5013c8b62d7d0070
7:   tiov1m0pssd4vn0agd2zeyghya6yahvky5dz2vplsh6 / dbc30836ac9bfa86a859222e4ee89dbb2c4a344a
8:   tiov1asdng5lhpr77yfgdqnjjasafy65tp6m2qmxmga / ec1b3453f708fde2250d04e52ec3a926a8b0eb6a
9:   tiov1vk7e3uzrzegfu5ue6l8jh4gw00g47tpznta4cv / 65bd98f04316509e5399d7cf2bd50e7bd15f2c22

***

Faucet accounts (coinType, see README)
0:   tiov12w76uev6kqjapap97ywjnwmj3da6ww0mlfa3ev / 53bdae659ab025d0f425f11d29bb728b7ba739fb
1:   tiov1ymcsvtpj6aj6nmzaemapxk4znx4htre6yavmqw / 26f1062c32d765a9ec5dcefa135aa299ab758f3a
2:   tiov1mw5y6mg7zts3mgfedzrl74x9q5pgy2dqdqypjk / dba84d6d1e12e11da1396887ff54c505028229a0
3:   tiov15a755nnsnzat0phd8vrq2tfcc2pqp5u4up9vev / a77d4a4e7098bab786ed3b06052d38c28200d395
4:   tiov14085y4an2e0j4va2y2nwg2404xrcr6ulpkvthk / abcf4257b3565f2ab3aa22a6e42aafa98781eb9f
5:   tiov1qvpv9lzvxh80nkwwdyeknl70aylkfccfpdjmq5 / 0302c2fc4c35cef9d9ce693369ffcfe93f64e309
6:   tiov14vhpxxj35fyf2ng92zvlldx82c5t2aahmz3wt2 / ab2e131a51a248954d055099ffb4c75628b577b7
7:   tiov1eacy2lnna0lcdtv3zcw6ejvmmfmxxguf3jjdch / cf70457e73ebff86ad91161dacc99bda76632389
8:   tiov1ufhqdla4zzvrrhrc4pxg4jacvujdlgltsf6xzf / e26e06ffb5109831dc78a84c8acbb86724dfa3eb
9:   tiov13g4wvz3yjyl95dlsyeasss3pmcvxfzxaqj3l3n / 8a2ae60a24913e5a37f0267b084221de186488dd
*/