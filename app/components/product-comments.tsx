"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { useStudent } from "../context/student-context";

type ProductComment = {
  id: string;
  authorName: string;
  createdAt: string;
  studentId: string;
  text: string;
};

const STORAGE_KEY_PREFIX = "357-product-comments";
const EMPTY_COMMENTS: ProductComment[] = [];
const listeners = new Set<() => void>();

let cachedComments: ProductComment[] = EMPTY_COMMENTS;
let cachedRawValue = "";
let cachedStorageKey = "";

function getCommentStorageKey(productId: number) {
  return `${STORAGE_KEY_PREFIX}:${productId}`;
}

function getBrowserStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  function handleStorageChange(event: StorageEvent) {
    if (event.key?.startsWith(STORAGE_KEY_PREFIX)) {
      listener();
    }
  }

  window.addEventListener("storage", handleStorageChange);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorageChange);
  };
}

function getStoredComments(storageKey: string) {
  const storage = getBrowserStorage();

  if (!storage) {
    return cachedComments;
  }

  const savedComments = storage.getItem(storageKey) ?? "";

  if (storageKey === cachedStorageKey && savedComments === cachedRawValue) {
    return cachedComments;
  }

  cachedStorageKey = storageKey;

  if (!savedComments) {
    cachedRawValue = "";
    cachedComments = EMPTY_COMMENTS;
    return cachedComments;
  }

  try {
    cachedRawValue = savedComments;
    cachedComments = JSON.parse(savedComments) as ProductComment[];
    return cachedComments;
  } catch {
    storage.removeItem(storageKey);
    cachedRawValue = "";
    cachedComments = EMPTY_COMMENTS;
    return cachedComments;
  }
}

function getServerSnapshot() {
  return EMPTY_COMMENTS;
}

function saveComments(storageKey: string, comments: ProductComment[]) {
  const storage = getBrowserStorage();

  cachedStorageKey = storageKey;
  cachedComments = comments;
  cachedRawValue = JSON.stringify(comments);
  storage?.setItem(storageKey, cachedRawValue);
  emitChange();
}

function formatCommentDate(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function ProductComments({
  productId,
}: Readonly<{
  productId: number;
}>) {
  const { student } = useStudent();
  const storageKey = useMemo(() => getCommentStorageKey(productId), [productId]);
  const comments = useSyncExternalStore(
    subscribe,
    () => getStoredComments(storageKey),
    getServerSnapshot,
  );
  const [isWriting, setIsWriting] = useState(false);
  const [commentText, setCommentText] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedText = commentText.trim();

    if (!student || !trimmedText) {
      return;
    }

    const nextComment: ProductComment = {
      id: `${Date.now()}-${student.studentId}`,
      authorName: student.fullName,
      createdAt: new Date().toISOString(),
      studentId: student.studentId,
      text: trimmedText,
    };

    saveComments(storageKey, [nextComment, ...comments]);
    setCommentText("");
    setIsWriting(false);
  }

  const commentLabel =
    comments.length === 1 ? "1 comment" : `${comments.length} comments`;

  return (
    <section className="border-t border-stone-200 pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">Comments</h2>
          <p className="mt-1 text-sm text-slate-600">{commentLabel}</p>
        </div>
        <button
          type="button"
          onClick={() => setIsWriting((currentValue) => !currentValue)}
          className="w-fit rounded-md border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 transition hover:bg-blue-100"
        >
          {isWriting ? "Close" : "Write comment"}
        </button>
      </div>

      {isWriting ? (
        <form onSubmit={handleSubmit} className="mt-5 rounded-md border border-stone-200 bg-white p-4 shadow-sm">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-slate-900">
              Your comment
            </span>
            <textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              required
              rows={4}
              className="resize-none rounded-md border border-stone-300 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-3 focus:ring-blue-100"
              placeholder="Write your comment about this product"
            />
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Post comment
            </button>
            <button
              type="button"
              onClick={() => {
                setCommentText("");
                setIsWriting(false);
              }}
              className="rounded-md border border-stone-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-stone-100"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}

      {comments.length === 0 ? (
        <div className="mt-5 rounded-md border border-dashed border-stone-300 bg-white p-5 text-sm text-slate-600">
          No comments yet for this product.
        </div>
      ) : (
        <div className="mt-5 grid gap-3">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="rounded-md border border-stone-200 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold text-slate-950">
                  {comment.authorName}
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  {formatCommentDate(comment.createdAt)}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {comment.text}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
