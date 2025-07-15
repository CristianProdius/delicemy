"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { NavigationData } from "@/types/navigation";
import { NavigationService } from "@/services/navigation.service";

interface NavigationContextType {
  navigation: NavigationData | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navigation, setNavigation] = useState<NavigationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchNavigation = async () => {
    try {
      setLoading(true);
      const data = await NavigationService.getNavigation();
      setNavigation(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNavigation();
  }, []);

  return (
    <NavigationContext.Provider
      value={{ navigation, loading, error, refetch: fetchNavigation }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within NavigationProvider");
  }
  return context;
};
