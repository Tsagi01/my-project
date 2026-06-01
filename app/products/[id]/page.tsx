import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AccountGate from "../../components/account-gate";
import ProductComments from "../../components/product-comments";
import ProductCard from "../../components/product-card";
import ProductDetailActions from "../../components/product-detail-actions";
import { products } from "../../data/products";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    id: String(product.id),
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = products.find(
    (currentProduct) => currentProduct.id === Number(resolvedParams.id),
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (currentProduct) =>
        currentProduct.id !== product.id &&
        currentProduct.category === product.category,
    )
    .slice(0, 3);

  return (
    <AccountGate>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-5 py-8 lg:px-6">
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/?page=1#products">Shop</Link>
          <span>/</span>
          <Link href="/?page=1#products">{product.category}</Link>
          <span>/</span>
          <span className="font-semibold text-slate-950">{product.name}</span>
        </nav>

        <section className="grid gap-8 md:grid-cols-[minmax(260px,0.9fr)_minmax(280px,1.1fr)] md:items-start">
          <div className="overflow-hidden rounded-md border border-stone-200 bg-white md:sticky md:top-6">
            <Image
              src={product.image}
              alt={product.imageAlt}
              width={1000}
              height={1000}
              className="aspect-square w-full object-contain p-5"
              priority
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2 text-sm font-semibold">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-800">
                {product.category}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                {product.stock} in stock
              </span>
            </div>

            <h1 className="mt-3 text-4xl font-bold text-slate-950">
              {product.name}
            </h1>
            <p className="mt-2 text-sm font-semibold text-blue-700">
              {product.supplier}
            </p>
            <p className="mt-5 text-2xl font-bold text-slate-950">
              ${product.price.toFixed(2)}
            </p>
            <p className="mt-5 text-slate-600">{product.description}</p>

            <ProductDetailActions product={product} />
          </div>
        </section>

        <ProductComments productId={product.id} />

        {relatedProducts.length > 0 ? (
          <section className="border-t border-stone-200 pt-8">
            <h2 className="text-2xl font-semibold text-slate-950">
              You may also like
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-3">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </AccountGate>
  );
}
