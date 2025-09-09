import MobileSidebar from "@/components/mobile-sidebar";
import { Sidebar } from "@/components/sidebar";
import SheetModal from "@/components/ui/sheet";
import { useMenuModal } from "@/hooks/useZustand";
import { Outlet } from "react-router";

export default function RootLayout() {
  const menuModal = useMenuModal();

  return (
    <>
      <SheetModal isOpen={menuModal.isOpen} onClose={menuModal.onClose}>
        <MobileSidebar />
      </SheetModal>

      <div className="flex gap-5">
        <Sidebar />

        <div className="flex flex-col gap-4 w-full p-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}
