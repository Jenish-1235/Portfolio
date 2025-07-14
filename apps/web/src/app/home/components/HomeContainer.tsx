// components/HomeContainer.tsx
export default function HomeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full overflow-x-hidden bg-bg-primary text-text-primary">
      {children}
    </main>
  );
}
