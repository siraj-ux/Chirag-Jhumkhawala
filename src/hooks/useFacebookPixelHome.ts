// // src/hooks/useFacebookPixel.ts
// import { useEffect } from "react";

// const PIXEL_ID = "842595278262482";

// export function useFacebookPixel() {
//   useEffect(() => {
//     // if already loaded, just track and return
//     if (window.fbq) {
//       window.fbq("init", PIXEL_ID);
//       window.fbq("track", "PageView");
//       return;
//     }

//     // create fbq and queue until script loads
//     (function (f: any, b: any, e: any, v: any, n: any, t: any, s: any) {
//       if (f.fbq) return;
//       n = f.fbq = function () {
//         n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
//       };
//       if (!f._fbq) f._fbq = n;
//       n.push = n;
//       n.loaded = true;
//       n.version = "2.0";
//       n.queue = [];
//       t = b.createElement(e);
//       t.async = true;
//       t.src = v;
//       s = b.getElementsByTagName(e)[0];
//       s.parentNode!.insertBefore(t, s);
//     })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js", null, null, null);

//     window.fbq!("init", PIXEL_ID);
//     window.fbq!("track", "PageView");
//   }, []);
// }

// src/hooks/useFacebookPixel.ts
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: any;
    _fbq?: any;
    __fbPixelInitialized?: boolean;
  }
}

const PIXEL_ID = "930328882711895"; // ✅ Your NEW pixel ID

export function useFacebookPixel(
  eventName?: string,
  eventParams?: Record<string, any>
) {
  useEffect(() => {
    // Load script only once
    if (!window.__fbPixelInitialized) {
      !(function (f: any, b, e, v, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod
            ? n.callMethod.apply(n, arguments)
            : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = true;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = true;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode!.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

      window.fbq("init", PIXEL_ID);
      window.__fbPixelInitialized = true;
    }

    // Always track PageView
    window.fbq("track", "PageView");

    // Track additional event like Purchase
    if (eventName) {
      window.fbq("track", eventName, eventParams || {});
    }
  }, [eventName]);
}