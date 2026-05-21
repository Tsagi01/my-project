"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "../data/products";
import { useBasket } from "../context/basket-context";

const categoryStyles: Record<string, string> = {
  Books: "bg-blue-50 text-blue-800 ring-blue-200",
  "CD/DVD": "bg-slate-50 text-slate-700 ring-slate-200",
  Software: "bg-cyan-50 text-cyan-800 ring-cyan-200",
  Hardware: "bg-indigo-50 text-indigo-800 ring-indigo-200",
};

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
    if (quantityInBasket <= 1) {
      removeFromBasket(product.id);
      return;
    }

    decreaseQuantity(product.id);
  }

  return (
    <article className="group flex h-full flex-col rounded-md border border-transparent p-2 transition hover:border-blue-100 hover:bg-white hover:shadow-sm">
      <div className="relative mb-3 overflow-hidden rounded-md bg-stone-100">
        <Link href={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <Image
            src={product.image}
            alt={product.imageAlt}
            width={800}
            height={600}
            className="aspect-square w-full object-cover transition duration-200 group-hover:scale-[1.02]"
          />
        </Link>
      </div>

      <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
        <span>{product.commentCount} comments</span>
        <span>{product.stock} in stock</span>
      </div>

      <Link href={`/products/${product.id}`} className="mt-2">
        <h3 className="min-h-12 text-base font-semibold leading-snug text-slate-950 transition group-hover:text-blue-700">
          {product.name}
        </h3>
        <p className="mt-1 text-sm font-bold text-slate-950">
          ${product.price.toFixed(2)}
        </p>
      </Link>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
            categoryStyles[product.category] ?? "bg-stone-100 text-stone-700 ring-stone-200"
          }`}
        >
          {product.category}
        </span>
        <span className="text-xs font-semibold text-slate-500">
          {product.options.length} options
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4">
        <p className="text-xs font-semibold text-slate-500">
          {quantityInBasket > 0
            ? `${quantityInBasket} in basket`
            : "Ready to add"}
        </p>

        {quantityInBasket > 0 ? (
          <div className="grid h-9 grid-cols-[32px_30px_32px] overflow-hidden rounded-md border border-stone-300 bg-white text-sm font-semibold text-slate-950">
            <button
              type="button"
              onClick={handleDecrease}
              className="grid place-items-center border-r border-stone-300 transition hover:bg-stone-100"
              aria-label={`Remove one ${product.name} from basket`}
            >
              -
            </button>
            <span className="grid place-items-center">{quantityInBasket}</span>
            <button
              type="button"
              onClick={() => addToBasket(product)}
              disabled={hasReachedStockLimit}
              className="grid place-items-center border-l border-stone-300 transition hover:bg-blue-600 hover:text-white disabled:bg-stone-100 disabled:text-stone-400"
              aria-label={`Add one ${product.name} to basket`}
            >
              +
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => addToBasket(product)}
            disabled={hasReachedStockLimit}
            className="rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-800 transition hover:bg-blue-100 disabled:bg-stone-100 disabled:text-stone-500"
            aria-label={`Add one ${product.name} to basket`}
          >
            Add
          </button>
        )}
      </div>
    </article>
  );
}
