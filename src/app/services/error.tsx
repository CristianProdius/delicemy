"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-neutral-800 mb-4">
          Something went wrong!
        </h2>
        <button
          onClick={() => reset()}
          className="px-6 py-2 bg-[#B8956A] text-white rounded-md hover:bg-[#A67E52] transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
