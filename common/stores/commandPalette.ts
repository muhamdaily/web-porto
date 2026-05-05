import { create } from "zustand";

type CommandPaletteState = {
    isOpen: boolean;
};

type CommandPaletteActions = {
    openPalette: () => void;
    closePalette: () => void;
    togglePalette: () => void;
};

export const useCommandPalette = create<
    CommandPaletteState & CommandPaletteActions
>((set) => ({
    isOpen: false,
    openPalette: () => set({ isOpen: true }),
    closePalette: () => set({ isOpen: false }),
    togglePalette: () => set((prev) => ({ isOpen: !prev.isOpen })),
}));
