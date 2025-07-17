import React from "react";
import "./globals.css";

export const metadata = {
  title: "Jenish Togadiya",
  description: "Jenish Togadiya's personal website",
  icons: {
    icon: "/favicon.jpeg", // or '/favicon.svg' or '/logo.png'
  },
  openGraph: {
    title: "Jenish Togadiya",
    description:
      "Engineering systems — across backend, mobile, and infra — with reliability and intent.",
    url: "https://jenish.site",
    siteName: "Jenish Togadiya",
    type: "website",
    images: [
      {
        url: "/favicon.jpeg", 
        width: 1200,
        height: 630,
        alt: "Jenish Togadiya",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
