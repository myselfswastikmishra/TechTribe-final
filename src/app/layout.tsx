import type { Metadata } from 'next'
import { ptSans, spaceGrotesk } from '@/lib/fonts'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  metadataBase: new URL('https://localhost:9002'),
  title: 'Tech Tribe - Community & Freelance Agency',
  description: 'A vibrant community for tech enthusiasts and professionals, and a freelance agency for building exceptional digital solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "font-body antialiased min-h-screen bg-background flex flex-col",
        ptSans.variable,
        spaceGrotesk.variable
      )}>
        <ThemeProvider
          defaultTheme="dark"
          storageKey="techtribe-theme"
        >
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
