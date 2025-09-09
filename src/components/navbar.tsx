import { useMenuModal } from "@/hooks/useZustand";
import { Menu } from "lucide-react";

type NavbarProps = {
  name: string;
};

const Navbar = ({ name }: NavbarProps) => {
  const menuModal = useMenuModal();

  return (
    <div className="flex justify-between items-center w-full">
      <h1 className="text-2xl">{name}</h1>
      <Menu className="max-md:flex hidden" onClick={menuModal.onOpen} />
    </div>
  );
};

export default Navbar;
