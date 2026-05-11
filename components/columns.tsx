import type { ReactNode } from "react";

export function Columns({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
        margin: "1.5rem 0",
      }}
    >
      {children}
    </div>
  );
}

export function Column({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
