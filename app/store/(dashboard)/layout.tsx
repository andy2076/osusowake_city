import { StoreNav } from "./store-nav";

export default function StoreDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StoreNav />
      {children}
    </>
  );
}
