import React from "react";

type ModalProps = {
  open: boolean;
  children: React.ReactNode;
};

export default function Modal({ open, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-40 bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg p-6 min-w-[400px] relative">
        {children}
      </div>
    </div>
  );
}
