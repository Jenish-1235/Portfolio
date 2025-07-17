// components/HomeContainer.tsx
"use client";

export default function HomeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full bg-bg-primary text-text-primary">
      {children}
    </main>
  );
}
