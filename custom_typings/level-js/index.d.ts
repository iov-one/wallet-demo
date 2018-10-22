declare module "level-js" {
    import { AbstractLevelDOWN } from "abstract-leveldown";

    export type Bytes = string | Buffer;

    export interface LevelJs extends AbstractLevelDOWN<Bytes, Bytes> {}

    export interface LevelJsConstructor {
        new (name: string): LevelJs;
        (name: string): LevelJs;
    }
        
    const levelJs: LevelJsConstructor;
    export default levelJs;
}
