import { create } from "zustand";

export const useSignatureStore = create((set) => ({
  signatures: [],

  addSignature: (signature) =>
    set((state) => ({
      signatures: [...state.signatures, signature],
    })),

  // For editing signature later
  editableSignature: null,

  setEditableSignature: (data) => set({ editableSignature: data }),
}));
