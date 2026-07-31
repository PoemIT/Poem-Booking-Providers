import { Card } from "../providerui/card";

type ErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

export function ErrorState({
  message = "Something went wrong loading this section.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center gap-3 py-8 text-center">
      <p className="text-sm text-slate-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Retry
      </button>
    </Card>
  );
}
