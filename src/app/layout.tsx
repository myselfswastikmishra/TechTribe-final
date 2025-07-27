import type { Metadata } from 'next'
import { PT_Sans, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { cn } from '@/lib/utils'

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:9002'),
  title: 'Tech Tribe - Community & Freelance Agency',
  description: 'Community for tech enthusiasts and professionals.',
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
