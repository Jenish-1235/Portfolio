// components/HomeContainer.tsx
export default function HomeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full overflow-y-auto bg-bg-primary text-text-primary" style={{ height: '100vh', scrollSnapType: 'y mandatory' }}>
      {children}
    </main>
  );
}
