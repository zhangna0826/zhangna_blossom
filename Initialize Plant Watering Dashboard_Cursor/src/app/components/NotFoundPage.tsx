import { Link } from "react-router";
import { Button } from "./ui/button";

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-[var(--space-8)] gap-[var(--space-4)] text-center px-[var(--page-margin-mobile)]">
      <h1 className="sr-only">Page not found</h1>
      <p className="text-display" aria-hidden="true">404</p>
      <p className="text-caption">This page could not be found.</p>
      <Button asChild variant="outline" size="sm">
        <Link to="/">Go home</Link>
      </Button>
    </div>
  );
}
