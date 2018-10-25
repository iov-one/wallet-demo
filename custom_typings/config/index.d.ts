declare module "config" {
  interface ConfigType {
    readonly [key: string]: any;
  }
  const c: ConfigType;
  export = c;      
}

