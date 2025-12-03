import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Umut Öztürk",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Full Stack Developer specializing in React, Next.js, Node.js" />
        <meta name="keywords" content="React, Next.js, Node.js, Full Stack, Developer" />
        <meta name="author" content="Umut Öztürk" />

        <meta property="og:title" content="Umut Öztürk" />
        <meta property="og:description" content="Full Stack Developer" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://umutozturk.xyz" />
        <meta property="og:image" content="https://umutozturk.xyz/himura.png" />

        <meta name="twitter:card" content="himura.png" />
        <meta name="twitter:title" content="Umut Öztürk" />
        <meta name="twitter:description" content="Full Stack Developer" />
        <meta name="twitter:image" content="https://umutozturk.xyz/himura.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
