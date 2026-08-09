import { MODULE_CONFIGS, ModuleKey, PrototypeItem, Tone } from "@/data/prototype-modules";
import { PropsWithChildren, createContext, useContext, useMemo, useState } from "react";

type PrototypeStore = {
  items: Record<ModuleKey, PrototypeItem[]>;
  unreadNotifications: number;
  addItem: (module: ModuleKey, title: string, description: string) => void;
  updateItemStatus: (module: ModuleKey, id: string, status: string, tone: Tone) => void;
  markNotificationsRead: () => void;
};

const PrototypeContext = createContext<PrototypeStore | null>(null);

const initialItems = Object.fromEntries(
  Object.entries(MODULE_CONFIGS).map(([key, config]) => [key, config.items]),
) as Record<ModuleKey, PrototypeItem[]>;

export function PrototypeProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useState(initialItems);
  const [unreadNotifications, setUnreadNotifications] = useState(3);

  const value = useMemo<PrototypeStore>(() => ({
    items,
    unreadNotifications,
    addItem(module, title, description) {
      setItems((current) => ({
        ...current,
        [module]: [
          {
            id: `${module}-${Date.now()}`,
            title,
            subtitle: MODULE_CONFIGS[module].singular,
            status: "Draft",
            tone: "grey",
            meta: "Created just now",
            description,
          },
          ...current[module],
        ],
      }));
    },
    updateItemStatus(module, id, status, tone) {
      setItems((current) => ({
        ...current,
        [module]: current[module].map((item) => item.id === id ? { ...item, status, tone } : item),
      }));
    },
    markNotificationsRead() {
      setUnreadNotifications(0);
    },
  }), [items, unreadNotifications]);

  return <PrototypeContext.Provider value={value}>{children}</PrototypeContext.Provider>;
}

export function usePrototypeStore() {
  const value = useContext(PrototypeContext);
  if (!value) throw new Error("usePrototypeStore must be used inside PrototypeProvider");
  return value;
}
