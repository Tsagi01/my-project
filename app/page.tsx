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
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-6 py-8">
        {/* Intro section for the home page. */}
        <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Requirement 1
          </p>
        <h1 className="mb-3 text-3xl font-bold">Product List</h1>
        <p className="max-w-3xl text-slate-800">
          This version shows a simple catalogue of SQA Advanced Higher
          Computing resources for 357 Ltd. Products are hard-coded, pagination
          is enabled, and the basket is saved in the browser for prototype
          purposes.
        </p>
        </section>

        {/* Product cards shown on the home page. */}
        <section id="products">
          <div className="mb-4">
          <h2 className="text-2xl font-semibold">Available Products</h2>
          <p className="text-slate-800">
            These products include books, CD or DVD resources, software, and
            hardware. This page shows 4 products at a time.
          </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Simple pagination controls for moving between product pages. */}
          <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm">
            {currentPage === 1 ? (
              <button
                type="button"
                disabled
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-500"
              >
                Previous
              </button>
            ) : (
              <Link
                href={buildPageLink(currentPage - 1)}
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
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
                className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-500"
              >
                Next
              </button>
            ) : (
              <Link
                href={buildPageLink(currentPage + 1)}
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
              >
                Next
              </Link>
            )}
          </div>
        </section>

        <section
          id="about"
          className="rounded-2xl border border-dashed border-slate-400 bg-white p-6"
        >
          <h2 className="mb-2 text-xl font-semibold">What comes later</h2>
          <p className="text-slate-800">
            In later steps, we can add product details, login, and checkout. For
            now, this prototype focuses on browsing products and managing a simple
            basket.
          </p>
        </section>
      </main>
    </AccountGate>
  );
}
