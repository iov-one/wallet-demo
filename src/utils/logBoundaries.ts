export interface Info {
  readonly componentStack: string;
}

export const logComponentStack = (error: Error, info: Info) => {
  console.log(error);
  console.log(info.componentStack);
};
