import { AiOutlineDashboard } from "react-icons/ai";
import { TbCircleNumber2 } from "react-icons/tb";

export const sidebarItems = [
  {
    id: 1,
    label: "Dashboard",
    href: "/",
    icon: <AiOutlineDashboard />,
  },
  {
    id: 1,
    label: "Item-2",
    href: "/item-2",
    icon: <TbCircleNumber2 />,
  },
];

export const API_URLS = {
  LOCAL: "",
  DEVELOPMENT: "",
  PRODUCTION: "",
};
