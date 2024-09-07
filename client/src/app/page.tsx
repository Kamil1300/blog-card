// app/page.tsx
import { Header } from '@/components/header';

interface child {
  children : React.ReactNode    
}
export default function Page({ children } : child) {
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
