
import {useCart} from '../dashboard/menu/CartContext.tsx';
import Delete from '../../assets/icons/delete.tsx';

export default function ShoppingCartItems() {
    const {cartItems, removeFromCart} = useCart();

    function removeCartProduct(itemId: number) {
        console.log(itemId)
        removeFromCart(itemId);
    }

    return (
        <section className="mt-8">
            <div className="text-center text-red-600 font-bold text-3xl">
                <h3>Cart</h3>
            </div>
            <div className="gap-4 grid grid-cols-2">
                <div>
                    {cartItems?.length === 0 && (
                        <h3 className="text-black font-bold text-center">No product in your cart</h3>
                    )}
                    {cartItems.map((item) => (
                        <div className="flex gap-16 mt-4 pb-2 items-center border-b" key={item.id}>
                            <div className="w-20">
                                <img src={item.image} alt="pizza" width={100} height={100}/>
                            </div>
                            <div className="font-semibold text-lg grow">
                                <p>{item.name}</p>
                            </div>
                            <div className="text-xl font-semibold">
                                <p>{item.price + '$'}</p>
                            </div>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => removeCartProduct(item.id)}
                                    className="font-semibold shadow border-2 items-center px-4 py-2 bg-white rounded-xl"
                                >
                                    <Delete/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div>Right</div>
            </div>
        </section>
    );
}
