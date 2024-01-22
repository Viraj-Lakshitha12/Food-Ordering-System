import {useCart} from '../dashboard/menu/CartContext.tsx';

export default function ShoppingCartItems() {
    const {cartItems} = useCart();

    return (
        <section className={'mt-8'}>
            <div className="text-center text-red-600 font-bold text-3xl">
                <h3>Cart</h3>
            </div>
            <div className={'gap-4 grid grid-cols-2'}>
                <div>
                    {cartItems?.length === 0 && (
                        <h3 className={'text-black font-bold text-center'}>No product in your cart</h3>
                    )}
                    {cartItems.map((item) => (
                        <div className={'flex gap-8 mt-4 pb-2 items-center border-b'} key={item.id}>
                            <div className={'w-20'}>
                                <img src={item.image} alt={'pizza'} width={100} height={100}/>
                            </div>
                            <div className={'font-semibold text-lg'}>
                                <p>{item.name}</p>
                            </div>
                            {/*<p>{item.description}</p>*/}
                            {/*<p>{item.price}</p>*/}
                            {/* Add more details if needed */}
                        </div>
                    ))}
                </div>
                <div>Right</div>
            </div>
        </section>
    );
}
