import { BlockchainSpec } from "src/logic";

declare let CONFIG: ConfigTypes;

interface ConfigTypes {
  readonly defaultPassword: string;
  readonly defaultFaucetUri: string;
  readonly chainSpec: BlockchainSpec;
}
