import { create } from "zustand";

export interface ModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const createModalStore = () =>
  create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));

export const useMenuModal = createModalStore();
