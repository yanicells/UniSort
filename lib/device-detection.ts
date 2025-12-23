export type DeviceType = "mobile" | "tablet" | "desktop";

export interface DeviceInfo {
  type: DeviceType;
  os: "ios" | "android" | "windows" | "macos" | "linux" | "unknown";
  isTouch: boolean;
}

export function getDeviceInfo(): DeviceInfo {
  if (typeof window === "undefined") {
    return { type: "desktop", os: "unknown", isTouch: false };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // iOS detection
  // iPad on iOS 13+ often reports as Macintosh, so we check for touch points
  const isIPad =
    /iPad/i.test(userAgent) ||
    (/Macintosh/i.test(userAgent) && isTouch);
  
  const isIPhone = /iPhone|iPod/i.test(userAgent);
  const isIOS = isIPad || isIPhone;

  // Android detection
  const isAndroid = /Android/i.test(userAgent);

  // Determine OS
  let os: DeviceInfo["os"] = "unknown";
  if (isIOS) os = "ios";
  else if (isAndroid) os = "android";
  else if (/Win/i.test(userAgent)) os = "windows";
  else if (/Mac/i.test(userAgent)) os = "macos";
  else if (/Linux/i.test(userAgent)) os = "linux";

  // Determine Type
  let type: DeviceType = "desktop";
  if (isIPad || (isAndroid && /Tablet/i.test(userAgent))) {
    type = "tablet";
  } else if (isIPhone || (isAndroid && !/Tablet/i.test(userAgent))) {
    type = "mobile";
  } else if (isTouch && (isAndroid || isIOS)) {
    // Fallback for other touch devices that might be tablets
    type = "tablet";
  }

  return { type, os, isTouch };
}
