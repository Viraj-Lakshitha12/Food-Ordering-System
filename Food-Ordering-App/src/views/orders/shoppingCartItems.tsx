import { useCart } from '../dashboard/menu/CartContext.tsx';

export default function ShoppingCartItems() {
    const { cartItems } = useCart();

    return (
        <section className={'mt-8'}>
            <div className="text-center text-red-600 font-bold text-3xl">
                <h3>Cart</h3>
            </div>
            <div className={'gap-4 grid grid-cols-2'}>
                <div>
                    {/* Display the cart items */}
                    {cartItems.map((item) => (
                        <div key={item.id}>
                            <p>{item.name}</p>
                            <p>{item.description}</p>
                            <p>{item.price}</p>
                            {/* Add more details if needed */}
                        </div>
                    ))}
                </div>
                <div>Right</div>
            </div>
        </section>
    );
}
