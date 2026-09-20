import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { ProductProvider } from "@/context/ProductContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ScrollToTop from "@/components/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aluvioncamera.com"),
  title: "Aluvion | Compact 4K Digital Camera",
  description:
    "Compact 4K digital camera featuring a 48MP sensor, 180-degree flip screen, 8X zoom, and 140g lightweight chassis. Includes complete accessory kit.",
  alternates: {
    canonical: "https://www.aluvioncamera.com/",
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://www.aluvioncamera.com/",
    title: "Aluvion | Compact 4K Digital Camera",
    description:
      "Pocketable 4K digital camera with 180-degree flip screen, 48MP photo capture, and complete shooting kit.",
    images: [
      {
        url: "/assets/camera-white.svg",
        width: 800,
        height: 500,
        alt: "Aluvion Pocket 4K Camera",
      },
    ],
    siteName: "Aluvion",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aluvion | Compact 4K Digital Camera",
    description:
      "4K video, 48MP photos, 180-degree flip screen in a portable 140g body.",
    images: ["/assets/camera-white.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Anti-FOUC theme hydration script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var theme = localStorage.getItem('aluvion_theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-white dark:bg-[#121316] text-[#121316] dark:text-[#FFFFFF] antialiased">
        <ThemeProvider>
          <ProductProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CookieConsent />
              <ScrollToTop />
            </CartProvider>
          </ProductProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
