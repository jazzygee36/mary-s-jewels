import { createContext, useContext, useState, type ReactNode } from "react";

type ProductType = {
  [x: string]: string;
  product: string;
  price: string;
  image: string;
  decription: string;
};

type AppContextType = {
  cartItems: ProductType[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (index: number) => void;
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
  quantity: number;
  increment: () => void;
  decrement: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);

  const decrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = (item: ProductType) => {
    setCartItems((prev) => {
      const alreadyExists = prev.some(
        (cartItem) => cartItem.product === item.product
      );

      if (alreadyExists) return prev;

      return [...prev, item];
    });

    setDrawerOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        drawerOpen,
        setDrawerOpen,
        quantity,
        increment,
        decrement,
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