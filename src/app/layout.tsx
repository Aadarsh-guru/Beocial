import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import DataProvider from "@/providers/DataProvider";
import ThemeProvider from "@/providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME as string + " - " + "Connect with people all around the world.",
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
  keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS as string,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_APP_URL as string,
    title: process.env.NEXT_PUBLIC_APP_NAME as string,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
    images: ['/icon.png'],
    siteName: process.env.NEXT_PUBLIC_APP_NAME as string,
    locale: 'en_US',
  },
  twitter: {
    card: "summary_large_image",
    title: process.env.NEXT_PUBLIC_APP_NAME as string,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
    images: ['/icon.png'],
    creator: process.env.NEXT_PUBLIC_ADMIN_EMAIL as string,
    site: process.env.NEXT_PUBLIC_TWITTER_HANDLE as string,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL as string),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={cn("h-full", inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          <DataProvider>
            {children}
            <Toaster />
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};