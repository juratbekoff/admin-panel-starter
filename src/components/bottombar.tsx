import { useState } from "react";
import { useNavigate } from "react-router";
import { Truck } from "lucide-react";

const Bottombar = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Truck,
    },
  ];

  const handleNavigate = (link: string, index: number) => {
    navigate(link);
    setActiveIndex(index);
  };

  return (
    <>
      <div className="bg-white fixed bottom-0 w-full border-t z-50 hidden max-lg:block">
        <div className="max-w-md mx-auto flex justify-around px-6 py-1">
          {menuItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={index}
                className="flex flex-col items-center pt-2 pb-1 px-3"
                onClick={() => handleNavigate(item.url, index)}
              >
                <item.icon
                  size={22}
                  className={`${
                    isActive ? "text-primary" : "text-gray-600"
                  } mb-1`}
                />
                <span
                  className={`text-xs ${
                    isActive ? "text-primary font-medium" : "text-gray-600"
                  }`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Bottombar;
