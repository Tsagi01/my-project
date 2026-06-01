"use client";

import { useState } from "react";
import type { Product } from "../data/products";
import { useBasket } from "../context/basket-context";

export default function ProductDetailActions({
  product,
}: Readonly<{
  product: Product;
}>) {
  const { addToBasket, getItemQuantity } = useBasket();
  const [selectedOption, setSelectedOption] = useState(product.options[0]);
  const [quantity, setQuantity] = useState(1);
  const quantityInBasket = getItemQuantity(product.id);
  const remainingStock = Math.max(product.stock - quantityInBasket, 0);
  const canAddToBasket = remainingStock > 0;

  function handleAddToBasket() {
    for (let index = 0; index < quantity; index += 1) {
      addToBasket(product);
    }
  }

  return (
    <div className="mt-6 rounded-md border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <p className="text-sm font-semibold text-slate-950">Order options</p>
          <p className="mt-1 text-sm text-slate-500">
            {remainingStock} available
          </p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-800">
          In stock
        </span>
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-950">
            {product.optionLabel}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.options.map((option) => {
              const isSelected = selectedOption === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedOption(option)}
                  className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-stone-300 bg-white text-slate-800 hover:bg-stone-100"
                  }`}
                  aria-pressed={isSelected}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[150px_1fr]">
          <div className="grid h-12 grid-cols-[44px_1fr_44px] overflow-hidden rounded-md border border-stone-300 bg-white">
            <button
              type="button"
              onClick={() =>
                setQuantity((currentQuantity) => currentQuantity - 1)
              }
              disabled={quantity === 1}
              className="border-r border-stone-300 text-lg font-semibold text-slate-800 transition hover:bg-stone-100 disabled:bg-stone-50 disabled:text-stone-300"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="grid place-items-center text-sm font-semibold text-slate-950">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() =>
                setQuantity((currentQuantity) => currentQuantity + 1)
              }
              disabled={quantity >= remainingStock}
              className="border-l border-stone-300 text-lg font-semibold text-slate-800 transition hover:bg-stone-100 disabled:bg-stone-50 disabled:text-stone-300"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToBasket}
            disabled={!canAddToBasket}
            className="h-12 rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:bg-stone-200 disabled:text-stone-500"
          >
            Add to Basket
          </button>
        </div>

        <p className="text-sm font-semibold text-slate-600">
          {quantityInBasket} in basket · {remainingStock} available
        </p>

        <div className="border-t border-stone-200 pt-5">
          <div className="grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-3">
            <p>Student account required</p>
            <p>Browser-saved basket</p>
            <p>Prototype payment only</p>
          </div>
        </div>
      </div>
    </div>
  );
}
