import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ProductType = {
  productName: string;
  amount: number;
  image: string;
  description: string;
  color?: string;
  quantity?: number;
};

type AppContextType = {
  cartItems: ProductType[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (index: number) => void;
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  incrementItem: (index: number) => void;
  decrementItem: (index: number) => void;
  subtotal: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductType[]>(() => {
    if (typeof window === "undefined") return [];

    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });
  const [drawerOpen, setDrawerOpen] = useState(false);

  const addToCart = (item: ProductType) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (p) => p?.productName === item?.productName && p.color === item.color,
      );

      if (existing) {
        return prev.map((p) =>
          p?.productName === item?.productName && p.color === item.color
            ? { ...p, quantity: (p.quantity || 1) + (item.quantity || 1) }
            : p,
        );
      }

      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });

    setDrawerOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((total, item) => {
    const amount = Number(item.amount) || 0;
    const quantity = Number(item.quantity) || 1;

    return total + amount * quantity;
  }, 0);

  const incrementItem = (index: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item,
      ),
    );
  };

  const decrementItem = (index: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: Math.max((item.quantity || 1) - 1, 1),
            }
          : item,
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        drawerOpen,
        setDrawerOpen,
        // quantity,
        incrementItem,
        decrementItem,
        subtotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return context;
};
