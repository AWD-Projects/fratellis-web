"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * Estado compartido de "Arma tu barra": lo que la persona elige en Sabores
 * y en Catering llega ya cargado al cotizador del formulario de contacto.
 */
type BarState = {
  eventType: string | null;
  services: string[];
  flavors: string[];
  setEventType: (value: string | null) => void;
  toggleService: (value: string) => void;
  toggleFlavor: (value: string) => void;
  clear: () => void;
};

const BarContext = createContext<BarState | null>(null);

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export function BarProvider({ children }: { children: React.ReactNode }) {
  const [eventType, setEventType] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);
  const [flavors, setFlavors] = useState<string[]>([]);

  const toggleService = useCallback((value: string) => setServices((prev) => toggle(prev, value)), []);
  const toggleFlavor = useCallback((value: string) => setFlavors((prev) => toggle(prev, value)), []);
  const clear = useCallback(() => {
    setEventType(null);
    setServices([]);
    setFlavors([]);
  }, []);

  const value = useMemo(
    () => ({ eventType, services, flavors, setEventType, toggleService, toggleFlavor, clear }),
    [eventType, services, flavors, toggleService, toggleFlavor, clear]
  );

  return <BarContext.Provider value={value}>{children}</BarContext.Provider>;
}

export function useBar() {
  const ctx = useContext(BarContext);
  if (!ctx) throw new Error("useBar debe usarse dentro de BarProvider");
  return ctx;
}
