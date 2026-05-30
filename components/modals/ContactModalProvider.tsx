"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import GetInTouchModal from "./GetInTouchModal";

interface ContactModalContextValue {
  open: () => void;
  close: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue>({
  open: () => {},
  close: () => {},
});

/** Hook to open/close the global "Get in touch" callback modal from anywhere. */
export function useContactModal() {
  return useContext(ContactModalContext);
}

export default function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ open, close }}>
      {children}
      <GetInTouchModal isOpen={isOpen} onClose={close} />
    </ContactModalContext.Provider>
  );
}
