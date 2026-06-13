import { Outlet, NavLink } from "react-router";
import { Home, Plus } from "lucide-react";
import { cn } from "./ui/utils";

export function Layout() {
  return (
    <div className="min-h-dvh flex flex-col max-w-lg mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-[calc(var(--control-md)+var(--space-4))]">
        <Outlet />
      </main>

      {/* Bottom navigation — pill links */}
      <nav
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg border-t border-hairline border-[var(--border-default)] bg-[var(--bg-surface)] z-10"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-center gap-[var(--space-2)] px-[var(--page-margin-mobile)] py-[var(--space-2)]">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              cn(
                "inline-flex items-center gap-[var(--space-2)] rounded-pill px-[var(--space-5)] py-[var(--space-3)] text-sm font-medium tracking-wide transition-[background-color,color] duration-[var(--duration-fast)] min-h-[var(--control-md)]",
                isActive
                  ? "bg-[var(--accent)] text-[var(--fg-on-accent)]"
                  : "text-[var(--fg-muted)] hover:bg-[var(--white)] hover:text-[var(--fg-default)]"
              )
            }
          >
            <Home className="size-5" />
            Home
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) =>
              cn(
                "inline-flex items-center gap-[var(--space-2)] rounded-pill px-[var(--space-5)] py-[var(--space-3)] text-sm font-medium tracking-wide transition-[background-color,color] duration-[var(--duration-fast)] min-h-[var(--control-md)]",
                isActive
                  ? "bg-[var(--accent)] text-[var(--fg-on-accent)]"
                  : "text-[var(--fg-muted)] hover:bg-[var(--white)] hover:text-[var(--fg-default)]"
              )
            }
          >
            <Plus className="size-5" />
            Add plant
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
