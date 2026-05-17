import Link from "next/link";
import AccountGate from "./components/account-gate";
import ProductCard from "./components/product-card";
import { products } from "./data/products";

type HomeProps = {
  searchParams: Promise<{
    page?: string | string[] | undefined;
  }>;
};

const PRODUCTS_PER_PAGE = 4;

// This helper reads the page number from the URL query.
// If the page is missing or invalid, it falls back to page 1.
function getPageNumber(page: string | string[] | undefined) {
  const pageValue = Array.isArray(page) ? page[0] : page;
  const parsedPage = Number(pageValue);

  if (!pageValue || !Number.isInteger(parsedPage) || parsedPage < 1) {
    return 1;
  }

  return parsedPage;
}

function buildPageLink(page: number) {
  return `/?page=${page}#products`;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedSearchParams = await searchParams;
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const requestedPage = getPageNumber(resolvedSearchParams.page);

  // Keep the page number inside the valid range.
  const currentPage = Math.min(requestedPage, totalPages);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <AccountGate>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-5 py-8 lg:px-6">
        {/* Intro section for the home page. */}
        <section className="border-b border-stone-200 pb-8">
          <nav className="mb-5 flex items-center gap-2 text-sm text-slate-500">
            <span>Shop</span>
            <span>/</span>
            <span className="font-semibold text-slate-950">Student Resources</span>
          </nav>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase text-blue-600">
              357 Ltd catalogue
            </p>
            <h1 className="text-4xl font-bold text-slate-950">
              Student Resources
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              Browse study guides, software, media resources, and hardware for
              SQA Advanced Higher Computing. Items can be added to a saved
              basket before choosing a prototype payment method.
            </p>
            <p className="mt-4 text-sm font-semibold text-slate-950">
              {products.length} products
            </p>
          </div>
        </section>

        {/* Product cards shown on the home page. */}
        <section id="products">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-950">
                Available Products
              </h2>
              <p className="text-sm text-slate-600">
                Showing 4 products at a time across books, media, software, and
                hardware.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-stone-200">
                Books
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-stone-200">
                CD/DVD
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-stone-200">
                Software
              </span>
              <span className="rounded-full bg-white px-3 py-1.5 ring-1 ring-stone-200">
                Hardware
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Simple pagination controls for moving between product pages. */}
          <div className="mt-6 flex items-center justify-between gap-4 rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
            {currentPage === 1 ? (
              <button
                type="button"
                disabled
                className="rounded-md bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-400"
              >
                Previous
              </button>
            ) : (
              <Link
                href={buildPageLink(currentPage - 1)}
                className="rounded-md border border-stone-300 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-stone-100"
              >
                Previous
              </Link>
            )}

            <p className="text-sm font-semibold text-slate-900">
              Page {currentPage} of {totalPages}
            </p>

            {currentPage === totalPages ? (
              <button
                type="button"
                disabled
                className="rounded-md bg-stone-100 px-4 py-2 text-sm font-semibold text-stone-400"
              >
                Next
              </button>
            ) : (
              <Link
                href={buildPageLink(currentPage + 1)}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Next
              </Link>
            )}
          </div>
        </section>

        <section
          id="about"
          className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
        >
          <h2 className="mb-2 text-lg font-semibold text-slate-950">
            Prototype scope
          </h2>
          <p className="text-sm text-slate-600">
            In later steps, we can add product details, login, and checkout. For
            now, this prototype focuses on browsing products and managing a simple
            basket.
          </p>
        </section>
      </main>
    </AccountGate>
  );
}
