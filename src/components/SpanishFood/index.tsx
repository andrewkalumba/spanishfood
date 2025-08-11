"use client";

import { useState, useEffect } from "react";
import AddButton from "@/components/AddButton";
import Cart from "@/components/Cart";
import spanishFoods, { SpanishFoodsProp } from "@/data/spanishData";

type SpanishFoodItem = SpanishFoodsProp;

// Extended Cart Item with quantity
interface CartItem extends SpanishFoodItem {
  quantity: number;
}

const SpanishFood = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("spanishFoodCart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("spanishFoodCart", JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (food: SpanishFoodItem) => {
  console.log("clicked");
  setCart(prevCart => {
    const existingIndex = prevCart.findIndex(item => item.name === food.name);
    if (existingIndex !== -1) {
      // Increase quantity
      const updatedCart = [...prevCart];
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + 1,
      };
      return updatedCart;
    } else {
      // Add new item with quantity 1
      return [...prevCart, { ...food, quantity: 1 }];
    }
  });
};
  // Increase quantity of item in cart
  const handleIncreaseQuantity = (name: string) => {
    setCart(prevCart => {
      return prevCart.map(item => item.name === name ? { ...item, quantity: item.quantity + 1 } : item);
    });
  };

  // Decrease quantity or remove if 1
  const handleDecreaseQuantity = (name: string) => {
    setCart(prevCart => {
      return prevCart.map(item => item.name === name ? {...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0);
    });
  };

  // Remove item completely
  const handleRemoveFromCart = (name: string) => {
    setCart(prevCart => prevCart.filter(item => item.name !== name));
  };

  // Calculate subtotal (items total)
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Tax & Shipping (example values)
  const TAX_RATE = 0.07; // 7%
  const SHIPPING_FEE = subtotal > 0 ? 5 : 0; // €5 shipping if cart not empty

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_FEE;

  // Checkout
  const handleCheckout = () => {
    alert(
      `Thank you! Your order total is €${total.toFixed(2)} (includes €${tax.toFixed(
        2
      )} tax and €${SHIPPING_FEE.toFixed(2)} shipping).`
    );
    setCart([]);
    localStorage.removeItem("spanishFoodCart");
  };

  return (
    <div>
      {/* Floating Cart */}
      <div className="fixed top-4 right-4 z-50">
        <Cart
          items={cart}
          onRemove={handleRemoveFromCart}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
          subtotal={subtotal}
          tax={tax}
          shipping={SHIPPING_FEE}
          total={total}
          onCheckout={handleCheckout}
        />
      </div>

      {/* Food List */}
      <div
        className="flex flex-col w-full justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: `url("./hotel19.jpeg")` }}
      >
        {spanishFoods.map((food, index) => (
          <div key={index} className="flex flex-col w-[80%] my-4">
            <div className="flex gap-4 justify-center items-center w-full">
              <img src={food.image} alt={food.name} className="w-[30%] h-auto rounded-2xl" />
              <div className="text-center w-[40%] bg-black/75 p-4 rounded-2xl">
                <div className="text-2xl mb-4 font-semibold text-white">{food.name}</div>
                <div className="mb-1 text-gray-200">{food.description}</div>
                <div className="text-lg font-medium text-green-300 mb-2">€{food.price.toFixed(2)}</div>
                <AddButton handleClick={() => handleAddToCart(food)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpanishFood;
