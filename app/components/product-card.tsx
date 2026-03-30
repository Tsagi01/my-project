"use client";

import type { Product } from "../data/products";
import { useBasket } from "../context/basket-context";

export default function ProductCard({
  product,
}: Readonly<{
  product: Product;
}>) {
  const {
    addToBasket,
    decreaseQuantity,
    getItemQuantity,
    removeFromBasket,
  } = useBasket();
  const quantityInBasket = getItemQuantity(product.id);
  const hasReachedStockLimit = quantityInBasket >= product.stock;

  function handleDecrease() {
    // If there is only one item left, remove it completely.
    if (quantityInBasket <= 1) {
      removeFromBasket(product.id);
      return;
    }

    decreaseQuantity(product.id);
  }

  return (
    <article className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold">{product.name}</h3>
      <p className="mb-1 text-sm text-slate-800">Category: {product.category}</p>
      <p className="mb-1 text-sm font-medium text-slate-900">
        Price: ${product.price.toFixed(2)}
      </p>
      <p className="mb-4 text-sm text-slate-800">Stock: {product.stock}</p>

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantityInBasket === 0}
          className="rounded-lg bg-slate-200 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-300 disabled:text-slate-500"
        >
          -
        </button>

        <span className="min-w-10 text-center text-sm font-semibold text-slate-900">
          {quantityInBasket}
        </span>

        {/* This button adds one item to the basket each time it is clicked. */}
        <button
          type="button"
          onClick={() => addToBasket(product)}
          disabled={hasReachedStockLimit}
          className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 disabled:bg-slate-200 disabled:text-slate-500"
        >
          +
        </button>
      </div>

      <p className="mt-3 text-sm text-slate-800">In basket: {quantityInBasket}</p>

      {hasReachedStockLimit ? (
        <p className="mt-1 text-sm font-medium text-amber-800">
          You have reached the available stock for this item.
        </p>
      ) : null}
    </article>
  );
}
