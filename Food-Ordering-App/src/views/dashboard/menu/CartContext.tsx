import React, {createContext, useContext, ReactNode, useState} from 'react';



export interface CartItem {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
}

interface CartContextValue {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (itemId: number) => void;
    cartCount: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems((prevItems) => [...prevItems, {...item, id: prevItems.length + 1}]);
    };

    const removeFromCart = (itemId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

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
