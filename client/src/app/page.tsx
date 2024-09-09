// app/page.tsx
import { Header } from '@/components/header';
import '@/app/globals.css'

interface PageProps  {
  children: React.ReactNode
  params?: any;
  searchParams?: any;
}

export default function Page({ children }: PageProps) {
  return (
    <div>
      {/* Global Header */}
      <Header />
      {/* Main Content */}
        {children}

      {/* Global Footer (if you have one) */}
      {/* <Footer /> */}
    </div>
  );
}
