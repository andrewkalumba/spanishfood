"use client";

import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoIosAddCircle, IoIosRemoveCircle } from "react-icons/io";

interface CartItemProp {
  name: string;
  price: number;
  quantity: number;
}

interface CartProp {
  items: CartItemProp[];
  onRemove: (name: string) => void;
  onIncrease: (name: string) => void;
  onDecrease: (name: string) => void;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  onCheckout: () => void;
}

const Cart = ({items, onRemove, onIncrease, onDecrease, subtotal, tax, shipping, total, onCheckout}: CartProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
     
      <button onClick={toggleDropdown} className="relative">
        <FaCartPlus className="text-3xl text-white" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {items.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 p-4 text-amber-900">
          <h3 className="text-lg font-semibold mb-2">Cart</h3>

          {items.length === 0 ? (
            <p className="text-sm text-gray-600">Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-2 max-h-60 overflow-y-auto">
                {items.map((item, index) => (
                  <li key={index} className="flex justify-between items-center text-sm">
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <button onClick={() => onDecrease(item.name)}>
                          <IoIosRemoveCircle className="text-red-500 hover:text-red-700 text-xl" />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button onClick={() => onIncrease(item.name)}>
                          <IoIosAddCircle className="text-green-500 hover:text-green-700 text-xl" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        €{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button onClick={() => onRemove(item.name)}>
                        <IoMdClose className="text-red-500 hover:text-red-700 text-xl" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="border-t pt-2 mt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (7%):</span>
                  <span>€{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>€{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              <button onClick={onCheckout} className="mt-3 w-full bg-green-600 text-white py-1 rounded hover:bg-green-700 transition">
                Cash Out
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
