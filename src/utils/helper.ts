
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { parseColor } from "tailwindcss/lib/util/color";

dayjs.extend(duration);

export const isDarkColor = (hex: string): boolean => {
  // Remove the hash at the start if it's included
  hex = hex.replace('#', '');

  // Convert the hex to RGB
  let r: number, g: number, b: number;

  if (hex.length === 3) {
    // If the hex color is shorthand (e.g. #fff), expand it to full length (e.g. #ffffff)
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    throw new Error('Invalid hex color');
  }

  // Calculate luminance (using the same formula)
  const luminance = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 255;

  // Return true for dark color (luminance <= 0.5) and false for bright color (luminance > 0.5)
  return luminance <= 0.5;
}
const cutText = (text: string, length: number) => {
  if (text.split(" ").length > 1) {
    const string = text.substring(0, length);
    const splitText = string.split(" ");
    splitText.pop();
    return splitText.join(" ") + "...";
  } else {
    return text;
  }
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const calculateAverage = (obj: Object): number => {
  const values = Object.values(obj);
  const sum = values.reduce((acc: number, val: number) => acc + val, 0);
  return sum / values.length;
};

const isHtmlEmpty = (htmlString: string): boolean => {
  if (!htmlString) return true;
  
  // Create temporary element
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  
  // Get text content and trim whitespace
  const textContent = tempDiv.textContent || tempDiv.innerText || '';
  const hasText = textContent.trim() !== '';
  
  // Check for empty elements with attributes
  const hasElementsWithAttributes = Array.from(tempDiv.querySelectorAll('*'))
    .some(el => {
      // Check for non-empty attributes (excluding style/class)
      return Array.from(el.attributes)
        .some(attr => !['class', 'style'].includes(attr.name));
    });
  
  return !hasText && !hasElementsWithAttributes;
};

const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format);
};

const imageResizer = (url: string, size: number = 300): string => {
  // Regex to match the part after 'upload/' and before the version or filename
  const regex = /(upload\/)([^/]*\/)?/;
  
  // Replacement string with size parameters
  const replacement = `$1c_fill,w_${size},h_${size},ar_1:1/$2`;
  
  // Perform the replacement
  return url.replace(regex, replacement);
}
const imageResizerDimension = (url: string, size: number = 300, dimension: 'w' | "h"): string => {
  // Regex to match the part after 'upload/' and before the version or filename
  const regex = /(upload\/)([^/]*\/)?/;
  
  // Replacement string with size parameters
  const replacement = `$1c_fill,${dimension}_${size}/$2`;
  
  // Perform the replacement
  return url.replace(regex, replacement);
}

const priceRender = (price: number[]) => {
  if (price.length === 1) {
    return Intl.NumberFormat('id-ID').format(price[0]);
  } else {
    price.sort((a, b) => a - b);
    return `${Intl.NumberFormat('id-ID').format(price[0])} - ${Intl.NumberFormat('id-ID').format(price[price.length - 1])}`;
  }
}
const capitalizeFirstLetter = (string: string) => {
  if (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } else {
    return "";
  }
};

const onlyNumber = (string: string) => {
  if (string) {
    return string.replace(/\D/g, "");
  } else {
    return "";
  }
};

const formatCurrency = (number: number) => {
  if (number) {
    const formattedNumber = number.toString().replace(/\D/g, "");
    const rest = formattedNumber.length % 3;
    let currency = formattedNumber.substr(0, rest);
    const thousand = formattedNumber.substr(rest).match(/\d{3}/g);
    let separator;

    if (thousand) {
      separator = rest ? "," : "";
      currency += separator + thousand.join(",");
    }

    return currency;
  } else {
    return "";
  }
};

const timeAgo = (time: string) => {
  const date = new Date((time || "").replace(/-/g, "/").replace(/[TZ]/g, " "));
  const diff = (new Date().getTime() - date.getTime()) / 1000;
  const dayDiff = Math.floor(diff / 86400);

  if (isNaN(dayDiff) || dayDiff < 0 || dayDiff >= 31) {
    return dayjs(time).format("MMMM DD, YYYY");
  }

  return (
    (dayDiff === 0 &&
      ((diff < 60 && "just now") ||
        (diff < 120 && "1 minute ago") ||
        (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
        (diff < 7200 && "1 hour ago") ||
        (diff < 86400 && Math.floor(diff / 3600) + " hours ago"))) ||
    (dayDiff === 1 && "Yesterday") ||
    (dayDiff < 7 && dayDiff + " days ago") ||
    (dayDiff < 31 && Math.ceil(dayDiff / 7) + " weeks ago")
  );
};

const diffTimeByNow = (time: string) => {
  const startDate = dayjs(dayjs().format("YYYY-MM-DD HH:mm:ss").toString());
  const endDate = dayjs(dayjs(time).format("YYYY-MM-DD HH:mm:ss").toString());

  const duration = dayjs.duration(endDate.diff(startDate));
  const milliseconds = Math.floor(duration.asMilliseconds());

  const days = Math.round(milliseconds / 86400000);
  const hours = Math.round((milliseconds % 86400000) / 3600000);
  let minutes = Math.round(((milliseconds % 86400000) % 3600000) / 60000);
  const seconds = Math.round(
    (((milliseconds % 86400000) % 3600000) % 60000) / 1000
  );

  if (seconds < 30 && seconds >= 0) {
    minutes += 1;
  }

  return {
    days: days.toString().length < 2 ? "0" + days : days,
    hours: hours.toString().length < 2 ? "0" + hours : hours,
    minutes: minutes.toString().length < 2 ? "0" + minutes : minutes,
    seconds: seconds.toString().length < 2 ? "0" + seconds : seconds,
  };
};

const isset = (obj: object | string) => {
  if (obj !== null && obj !== undefined) {
    if (typeof obj === "object" || Array.isArray(obj)) {
      return Object.keys(obj).length;
    } else {
      return obj.toString().length;
    }
  }

  return false;
};

const toRaw = (obj: object) => {
  return JSON.parse(JSON.stringify(obj));
};

const randomNumbers = (from: number, to: number, length: number) => {
  const numbers = [0];
  for (let i = 1; i < length; i++) {
    numbers.push(Math.ceil(Math.random() * (from - to) + to));
  }

  return numbers;
};

const toRGB = (value: string) => {
  return parseColor(value).color.join(" ");
};

const stringToHTML = (arg: string) => {
  const parser = new DOMParser(),
    DOM = parser.parseFromString(arg, "text/html");
  return DOM.body.childNodes[0] as HTMLElement;
};

const slideUp = (
  el: HTMLElement,
  duration = 300,
  callback = (el: HTMLElement) => {}
) => {
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.height = el.offsetHeight + "px";
  el.offsetHeight;
  el.style.overflow = "hidden";
  el.style.height = "0";
  el.style.paddingTop = "0";
  el.style.paddingBottom = "0";
  el.style.marginTop = "0";
  el.style.marginBottom = "0";
  window.setTimeout(() => {
    el.style.display = "none";
    el.style.removeProperty("height");
    el.style.removeProperty("padding-top");
    el.style.removeProperty("padding-bottom");
    el.style.removeProperty("margin-top");
    el.style.removeProperty("margin-bottom");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    callback(el);
  }, duration);
};

const slideDown = (
  el: HTMLElement,
  duration = 300,
  callback = (el: HTMLElement) => {}
) => {
  el.style.removeProperty("display");
  let display = window.getComputedStyle(el).display;
  if (display === "none") display = "block";
  el.style.display = display;
  let height = el.offsetHeight;
  el.style.overflow = "hidden";
  el.style.height = "0";
  el.style.paddingTop = "0";
  el.style.paddingBottom = "0";
  el.style.marginTop = "0";
  el.style.marginBottom = "0";
  el.offsetHeight;
  el.style.transitionProperty = "height, margin, padding";
  el.style.transitionDuration = duration + "ms";
  el.style.height = height + "px";
  el.style.removeProperty("padding-top");
  el.style.removeProperty("padding-bottom");
  el.style.removeProperty("margin-top");
  el.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    el.style.removeProperty("height");
    el.style.removeProperty("overflow");
    el.style.removeProperty("transition-duration");
    el.style.removeProperty("transition-property");
    callback(el);
  }, duration);
};

export {
  cutText,
  formatDate,
  capitalizeFirstLetter,
  onlyNumber,
  formatCurrency,
  timeAgo,
  diffTimeByNow,
  isset,
  toRaw,
  randomNumbers,
  toRGB,
  stringToHTML,
  slideUp,
  slideDown,
  isHtmlEmpty, 
  isValidEmail,
  imageResizer,
  imageResizerDimension,
  priceRender
};
