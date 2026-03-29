import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XCLSV — Commission Bespoke Music from Iconic Artists",
  description:
    "The world's most exclusive music marketplace. Commission one-of-one songs from legendary artists. $10K–$100K. Streaming only. Unrepeatable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg text-text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
