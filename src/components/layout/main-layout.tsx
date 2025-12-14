import { Header, Footer, Navbar } from "@/components/layout";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen relative flex flex-col bg-white dark:bg-gray-950 w-full max-w-[1200px] mx-auto">
      <Header />
      <Navbar />

      <main className="w-full my-2">{children}</main>

      <Footer />
    </div>
  );
}
