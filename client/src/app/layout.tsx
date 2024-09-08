"use client"
import { Inter } from "next/font/google";
import '@/app/globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  const router = useRouter();

  useEffect(() => {
    // Redirect from '/' to '/home'
    router.push('/home');
  }, [router]);
  return (
    <html lang="en">
      <body className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
        </body>
    </html>
  );
}
