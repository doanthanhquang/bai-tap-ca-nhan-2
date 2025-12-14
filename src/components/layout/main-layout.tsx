import { Header, Footer } from "@/components/layout";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950 w-full">
      <Header />

      <main className="flex-1 w-full mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
