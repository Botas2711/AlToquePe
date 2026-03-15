// Global/layout.js
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const isSmall = width < 380;
const isMedium = width < 420;
const isLarge = width >= 420;

export const WIDTH = width;
export const HEIGHT = height;

const getMargin = () => {
  if (isLarge) return width * 0.05;
  if (isMedium) return width * 0.04;
  return width * 0.035;
};

export const MARGIN = getMargin();
export const PADDING = MARGIN;
export const SPACING = {
  xs: MARGIN * 0.25,
  sm: MARGIN * 0.5,
  md: MARGIN,
  lg: MARGIN * 1.5,
  xl: MARGIN * 2,
};

export const ITEM_WIDTH = (width - MARGIN * 4) / 2;
export const ITEM_IMAGE_SIZE = ITEM_WIDTH * 0.65;

export const SLIDER_HEIGHT = isSmall ? height * 0.18 : height * 0.2;
export const SLIDER_WIDTH = width - MARGIN * 2;

export const FONT = {
  xs: Math.min(width * 0.028, 11),
  sm: Math.min(width * 0.032, 13),
  md: Math.min(width * 0.038, 15),
  lg: Math.min(width * 0.045, 18),
  xl: Math.min(width * 0.055, 22),
  xxl: Math.min(width * 0.065, 26),
};

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 15,
  xl: 20,
  full: 999,
};

export const DETAIL_IMAGE_HEIGHT = isSmall ? height * 0.38 : height * 0.42;
export const DETAIL_IMAGE_WIDTH = width * 0.85;

export const TAB_HEIGHT = 70;

export const HEADER_HEIGHT = 85;

export const CATEGORY_SIZE = isSmall ? width * 0.13 : width * 0.14;
export const CATEGORY_FONT = FONT.xs;

export const BUTTON = {
  height: isSmall ? 44 : 48,
  fontSize: FONT.md,
  borderRadius: RADIUS.md,
  paddingHorizontal: MARGIN * 2,
};