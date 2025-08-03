
import type { Metadata } from 'next'
import { spaceGrotesk } from '@/lib/fonts'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ThemeProvider } from "@/components/ThemeProvider"
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  metadataBase: new URL('https://techtribe.com'),
  title: {
    default: 'Tech TribeX - Community & Freelance Agency',
    template: '%s | Tech TribeX',
  },
  description: 'A vibrant community for tech enthusiasts and a freelance agency for building exceptional digital solutions. Explore our projects, events, and services.',
  openGraph: {
    title: 'Tech TribeX - Community & Freelance Agency',
    description: 'A vibrant community for tech enthusiasts and a freelance agency for building exceptional digital solutions.',
    url: 'https://techtribe.com',
    siteName: 'Tech TribeX',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Tech TribeX - Community & Freelance Agency',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "font-sans antialiased min-h-screen bg-background flex flex-col",
        spaceGrotesk.variable
      )}>
        <ThemeProvider
          attribute="class"
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
