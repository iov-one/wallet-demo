import { lg, md, sm, xl, xs } from "~/theme/variables";

export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export const getSize = (size: Size | typeof undefined) => {
  switch (size) {
    case "xs":
      return xs;
    case "sm":
      return sm;
    case "md":
      return md;
    case "lg":
      return lg;
    case "xl":
      return xl;
    default:
      return "0px";
  }
};
