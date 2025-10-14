import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ace S - Digital Artist & Creative Portfolio",
  description: "Explore the imaginative world of Ace S, a digital artist creating stunning visual experiences through contemporary art, digital paintings, and creative expressions.",
  keywords: ["Ace S", "digital art", "artist portfolio", "contemporary art", "creative", "painting", "visual art", "modern art"],
  authors: [{ name: "Ace S" }],
  creator: "Ace S",
  publisher: "Ace S Portfolio",
  openGraph: {
    title: "Ace S - Digital Artist & Creative Portfolio",
    description: "Exploring imagination through art - Discover stunning digital artworks and creative expressions",
    url: "https://acesart.com",
    siteName: "Ace S Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ace S - Digital Artist & Creative Portfolio",
    description: "Exploring imagination through art - Discover stunning digital artworks and creative expressions",
    creator: "@acesart",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
