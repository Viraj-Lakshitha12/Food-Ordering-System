import React, {createContext, useContext, ReactNode, useState} from 'react';

// Export the CartItem type
export interface CartItem {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

// @ts-ignore
interface CartContextProps {
    children: ReactNode;
}

interface CartProviderProps {
    children: ReactNode;
}

interface CartContextValue {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: number) => void;
    // Add the cartCount property
    cartCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({children}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (itemId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    // Initialize cartCount based on the length of cartItems
    const cartCount = cartItems.length;

    const cartContextValue: CartContextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        cartCount,
    };

    return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
