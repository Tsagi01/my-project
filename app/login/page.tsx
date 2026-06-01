import LoginForm from "../components/login-form";

type LoginPageProps = {
  searchParams: Promise<{
    redirect?: string | string[] | undefined;
  }>;
};

function getRedirectPath(redirect: string | string[] | undefined) {
  const redirectValue = Array.isArray(redirect) ? redirect[0] : redirect;

  if (!redirectValue || !redirectValue.startsWith("/")) {
    return "/";
  }

  return redirectValue;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;
  const redirectTo = getRedirectPath(resolvedSearchParams.redirect);

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-5 py-8 lg:px-6">
      <section className="grid gap-6 border-b border-stone-200 pb-8 lg:grid-cols-[1fr_380px] lg:items-end">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase text-blue-600">
            Secure access
          </p>
          <h1 className="text-4xl font-bold text-slate-950">
            Login to 357 Ltd ordering
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Student access keeps the catalogue, basket, and payment prototype
            inside a controlled coursework-style flow.
          </p>
          <p className="mt-3 max-w-2xl text-sm font-semibold text-slate-500">
            Prototype note: account details, baskets, comments, and order
            confirmations are saved locally in this browser for demonstration.
          </p>
        </div>

        <div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-slate-950">Flow</p>
          <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs font-semibold text-slate-600">
            <span className="rounded-md bg-blue-50 px-2 py-2 text-blue-700">
              Login
            </span>
            <span className="rounded-md bg-stone-100 px-2 py-2">
              Browse
            </span>
            <span className="rounded-md bg-stone-100 px-2 py-2">
              Basket
            </span>
            <span className="rounded-md bg-stone-100 px-2 py-2">
              Confirm
            </span>
          </div>
        </div>
      </section>

      <LoginForm redirectTo={redirectTo} />
    </main>
  );
}
