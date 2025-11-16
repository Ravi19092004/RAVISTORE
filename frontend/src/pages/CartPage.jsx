import { Link } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { motion } from "framer-motion";
import { ShoppingCart, Plus, Minus, Trash2, Eye, ArrowLeft } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

  const totalPrice = getTotalPrice();

  return (
    <div className="py-8 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <motion.div
            className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.length === 0 ? (
              <EmptyCartUI />
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    removeFromCart={removeFromCart}
                    updateQuantity={updateQuantity}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {cart.length > 0 && (
            <motion.div
              className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <OrderSummary totalPrice={totalPrice} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className="rounded-lg border border-base-300 bg-base-100 p-4 shadow-md">
      <div className="flex items-center gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <p className="text-2xl font-bold text-primary">${Number(item.price).toFixed(2)}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            className="btn btn-sm btn-outline"
          >
            <Minus className="size-4" />
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="btn btn-sm btn-outline"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <Link
          to={`/product/${item.id}`}
          className="btn btn-sm btn-info btn-outline"
        >
          <Eye className="size-4" />
        </Link>
        <button
          onClick={() => removeFromCart(item.id)}
          className="btn btn-sm btn-error"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </div>
  );
};

const OrderSummary = ({ totalPrice }) => {
  return (
    <div className="rounded-lg border border-base-300 bg-base-100 p-6 shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Link to="/" className="btn btn-outline w-full flex items-center justify-center gap-2">
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Link>
        <button className="btn btn-primary w-full">Proceed to Checkout</button>
      </div>
    </div>
  );
};

const EmptyCartUI = () => (
  <motion.div
    className="flex flex-col items-center justify-center space-y-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ShoppingCart className="h-24 w-24 text-gray-300" />
    <h3 className="text-2xl font-semibold">Your cart is empty</h3>
    <p className="text-gray-400">Looks like you haven't added anything to your cart yet.</p>
    <Link
      className="mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600"
      to="/"
    >
      Start Shopping
    </Link>
  </motion.div>
);

export default CartPage;
