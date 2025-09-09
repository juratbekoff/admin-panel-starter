import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import toastResponsive from "react-hot-toast";
import dateFormat from "dateformat";
import type { Currency, IStage } from "@/types";
import { format } from "date-fns";
import { uz } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const customToast = (type: "SUCCESS" | "ERROR", message: string) => {
  switch (type) {
    case "SUCCESS":
      toastResponsive.success(`${message}`, {
        duration: 4000,
      });
      break;
    case "ERROR":
      toastResponsive.error(`${message}`, {
        duration: 3000,
      });
      break;
    default:
      toastResponsive("Something went wrong!");
      break;
  }
};

export const dateFormatter = (date: string | Date) => {
  const paddedShortDate = dateFormat(date, "dd.mm.yyyy");
  const shortTime = dateFormat(date, "HH:MM");

  return `${paddedShortDate}, ${shortTime}`;
};

export function numerberSpacer(n: number | string) {
  if (!n) return 0;
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatUzbekPhoneNumber(phoneNumber: string) {
  if (!phoneNumber) return null;

  const cleaned = phoneNumber.replace(/\D/g, ""); // Remove non-digit characters
  const match = cleaned.match(/^998(\d{2})(\d{3})(\d{4})$/);

  if (match) {
    return `+998 ${match[1]} ${match[2]} ${match[3]}`;
  }

  return phoneNumber;
}

export function formatCount(count: number) {
  if (!count) return 0;

  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(".0", "")} m`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(".0", "")} k`;
  }
  return count.toString();
}

export const getNormalizedRole = (role: IStage) => {
  if (role === "ADMIN") return "Admin";
  if (role === "DIRECTOR_ENTRY" || role === "DIRECTOR_EXIT") return "Direktor";
  if (role === "ACCOUNTANT") return "Bugxalter";
  if (role === "STORE") return "Ombor";
  if (role === "SECURITY") return "Oxrana";
  if (role === "MANAGER") return "Manager";

  return role;
};

export const formatCurrency = (amount: number, currency: Currency): string => {
  return new Intl.NumberFormat("uz-UZ", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string | Date): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return format(date, "dd/MM/yyyy, HH:mm", { locale: uz });
};

export function getLabelForStage(stage: IStage): string {
  const labels = {
    ADMIN: "Admin",
    DIRECTOR_ENTRY: "Direktor (kirish)",
    DIRECTOR_EXIT: "Direktor (chiqish)",
    ACCOUNTANT: "Bugxalter",
    ACCOUNTANT_MANAGER: "Bugxalter (naqd)",
    STORE: "Ombor",
    SECURITY: "Oxrana",
    SECURITY_ENTRY: "Oxrana (Kirish)",
    SECURITY_EXIT: "Oxrana (Chiqish)",
    MANAGER: "Manager",
    FINISHED: "Yakunlangan",
    ALL: "Hammasi",
    RETURNED: "Qaytib kelgan",
  };
  return labels[stage] || "Hammasi";
}

export const getStageColor = (stage: IStage): string => {
  // Special color for RETURNED stage
  if (stage === "RETURNED") {
    return "bg-gray-500 text-white";
  }

  if (stage === "FINISHED") {
    return "bg-gray-200 text-gray-700";
  }

  // Same color for all other stages
  return "bg-blue-100 text-blue-600";
};

export const getFileNameFromAwsUrl = (url: string) => {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    return decodeURIComponent(urlObj.pathname.slice(1));
  } catch {
    return null;
  }
};
