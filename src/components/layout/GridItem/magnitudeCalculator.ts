import { screenLg, screenMd, screenSm } from "~/theme/variables";

export type Magnitude = number | undefined;

export const getMagnitudeFrom = (magnitude: number): string => {
  if (magnitude === 0) {
    return "0%";
  }

  if (magnitude === 1) {
    return "8.333%";
  }

  if (magnitude === 2) {
    return "16.667%";
  }

  if (magnitude === 3) {
    return "25%";
  }

  if (magnitude === 4) {
    return "33.333%";
  }

  if (magnitude === 5) {
    return "41.667%";
  }

  if (magnitude === 6) {
    return "50%";
  }

  if (magnitude === 7) {
    return "58.333%";
  }

  if (magnitude === 8) {
    return "66.667%";
  }

  if (magnitude === 9) {
    return "75%";
  }

  if (magnitude === 10) {
    return "83.333%";
  }

  if (magnitude === 11) {
    return "91.667%";
  }

  if (magnitude === 12) {
    return "100%";
  }

  return "100%";
};

export const getMaxWidthStyleFrom = (size: number, growSize: number, screenSize: number) => {
  const originalMaxWidth = getMagnitudeFrom(size);
  const partToTrim = getMagnitudeFrom(growSize);
  const value = `calc(${originalMaxWidth} + ${partToTrim} - 2px - ${screenSize}px)`;
  return {
    maxWidth: value,
    flexBasis: value,
  };
};

export const calculateMaxWidthBasedOn = (
  sm: Magnitude,
  md: Magnitude,
  lg: Magnitude,
  growSm: Magnitude,
  growMd: Magnitude,
  growLg: Magnitude,
  viewportWidth: number,
  growColWidth: number,
) => {
  if (sm && growSm && viewportWidth >= screenSm) {
    return getMaxWidthStyleFrom(sm, growSm, growColWidth);
  }

  if (md && growMd && viewportWidth >= screenMd) {
    return getMaxWidthStyleFrom(md, growMd, growColWidth);
  }

  if (lg && growLg && viewportWidth >= screenLg) {
    return getMaxWidthStyleFrom(lg, growLg, growColWidth);
  }

  return undefined;
};
