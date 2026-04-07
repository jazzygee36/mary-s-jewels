import { createContext, useContext, useState, type ReactNode } from "react";

type ProductType = {
  product: string;
  price: number;
  image: string;
  decription: string;
  color?: string;
  quantity?: number;
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
  subtotal: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);

  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = (item: ProductType) => {
    setCartItems((prev) => {
      const alreadyExists = prev.some(
        (cartItem) => cartItem.product === item.product,
      );

      if (alreadyExists) return prev;

      return [...prev, item];
    });

    setDrawerOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;

    return total + price * quantity;
  }, 0);

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
        subtotal,
      }}>
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
