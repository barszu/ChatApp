import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import ReactQuerryProvider from "@/app/providers/react-querry";
import SafeHydration from "@/components/ui/SafeHydration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JS/TS Code Reviewer",
  description: "AI-powered code review tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" suppressHydrationWarning={true}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SafeHydration>
          <ChakraProvider>
            <ReactQuerryProvider>{children}</ReactQuerryProvider>
          </ChakraProvider>
        </SafeHydration>
      </body>
    </html>
  );
}
