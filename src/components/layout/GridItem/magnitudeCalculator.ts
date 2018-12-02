import { screenMd, screenSm, screenXs } from "~/theme/variables";

export type Magnitude = number | undefined;

const getMagnitudeFrom = (magnitude: number): string => {
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

const getMaxWidthStyleFrom = (size: number, growSize: number, screenSize: number) => {
  const originalMaxWidth = getMagnitudeFrom(size);
  const partToTrim = getMagnitudeFrom(growSize);
  const value = `calc(${originalMaxWidth} + ${partToTrim} - ${screenSize}px)`;
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
) => {
  if (sm && growSm) {
    return getMaxWidthStyleFrom(sm, growSm, screenXs);
  }

  if (md && growMd) {
    return getMaxWidthStyleFrom(md, growMd, screenSm);
  }

  if (lg && growLg) {
    return getMaxWidthStyleFrom(lg, growLg, screenMd);
  }

  return undefined;
};
