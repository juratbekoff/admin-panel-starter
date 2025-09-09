import React, { useRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface SelectItemType {
  value: string | number;
  label: string | number;
}

interface CustomizedSelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  items?: SelectItemType[];
  placeholder?: string;
  className?: string;
  contentClassName?: string;
  itemClassName?: string;
  useLocation?: boolean;
  isLocating?: boolean;
  onLocationDetected?: (coords: {
    latitude: number;
    longitude: number;
  }) => void;
}

const CustomizedSelect: React.FC<CustomizedSelectProps> = ({
  value,
  defaultValue,
  onChange,
  items = [],
  placeholder = "Select an option",
  className = "",
  contentClassName = "",
  itemClassName = "",
  useLocation = false,
  isLocating = false,
  onLocationDetected,
  ...props
}) => {
  const [_, setIsOpen] = useState(false);
  const firstOpenRef = useRef(true);

  const detectLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        if (onLocationDetected) {
          onLocationDetected(coords);
        }
      },
      (error) => {
        console.error("Error getting location:", error.message);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  // Detect when the dropdown is opened
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    // If opening the dropdown for the first time and useLocation is enabled
    if (open && firstOpenRef.current && useLocation) {
      firstOpenRef.current = false;
      detectLocation();
    }
  };

  return (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange}
      onOpenChange={handleOpenChange}
      {...props}
    >
      <SelectTrigger className={cn("w-full", className)}>
        {isLocating ? (
          <div className="flex items-center text-gray-500">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Joylashuvni aniqlash...</span>
          </div>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent className={cn("min-w-[200px]", contentClassName)}>
        {items.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value.toString()}
            className={itemClassName}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CustomizedSelect;
