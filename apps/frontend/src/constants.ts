/**
 * Application constants
 * Centralized constants for consistent usage across the application
 */

/**
 * Screen breakpoints
 */
export const BREAKPOINTS = {
  MOBILE: 768,
} as const;

/**
 * Timing constants (in milliseconds)
 */
export const TIMING = {
  INSTALL_BANNER_DELAY: 3000,
  SCROLLBAR_HIDE_DELAY: 1000,
  HOVER_DELAY: 100,
  AUTO_FOCUS_DELAY: 100,
  SCROLL_TO_TOP_DELAY: 50,
  SERVICE_WORKER_UPDATE_INTERVAL: 60 * 60 * 1000, // 1 hour
} as const;

/**
 * Image analysis constants
 */
export const IMAGE_ANALYSIS = {
  SAMPLE_SIZE: 200,
  BRIGHTNESS_THRESHOLD: 100,
  PIXEL_SAMPLE_INTERVAL: 32, // Sample every 8th pixel (32 bytes = 8 RGBA pixels)
} as const;

/**
 * Layout constants
 */
export const LAYOUT = {
  DESKTOP_PANEL_WIDTH: 640,
  DESKTOP_PANEL_HEIGHT: 480,
  DESKTOP_PANEL_TOP: "15%",
  DESKTOP_PANEL_MARGIN_LEFT: -320, // Half of panel width
  MOBILE_SEARCH_BAR_BOTTOM: 20,
  MOBILE_INSTALL_BANNER_BOTTOM: 68,
  DESKTOP_INSTALL_BANNER_BOTTOM: 24,
  APP_ICON_SIZE: 72,
  APP_ICON_MOBILE_SIZE: 56,
  APP_ICON_INNER_SIZE: 45,
  APP_ICON_INNER_MOBILE_SIZE: 35,
  APP_ICON_BORDER_RADIUS: 20,
  APP_ICON_MOBILE_BORDER_RADIUS: 16,
  APP_ICON_INNER_BORDER_RADIUS: 13,
  APP_ICON_INNER_MOBILE_BORDER_RADIUS: 10,
  GRID_COLUMNS: 4,
  MIN_SCROLLBAR_HEIGHT: 20,
} as const;

/**
 * API and URL constants
 */
export const URLS = {
  ZIGO_APP: "https://dhr.digikala.com/apps/zigo",
  BACKGROUND_IMAGE_PATH: "/uploads/background.png",
} as const;

/**
 * Keyboard shortcuts
 */
export const KEYBOARD_SHORTCUTS = {
  SEARCH: "k",
  SELECT_ALL: "a",
} as const;

/**
 * Default values
 */
export const DEFAULTS = {
  APP_BG_COLOR: "rgba(0,0,0,0.1)",
  CATEGORY_ORDER: 999,
  VIEWPORT_HEIGHT_MULTIPLIER: 0.01,
} as const;

