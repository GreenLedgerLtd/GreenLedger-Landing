import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LandingShell } from "@/components/landing/LandingShell";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "GreenLedger | Unlock Green Capital in Africa",
  description:
    "GreenLedger connects sustainable African SMEs and startups with banks and financial institutions deploying green finance. Access verified green funding and ESG-aligned deal flow.",
  keywords: [
    "green finance",
    "African SMEs",
    "ESG",
    "climate finance",
    "sustainable finance",
    "green capital",
    "Africa",
    "fintech",
  ],
  openGraph: {
    title: "GreenLedger | Unlock Green Capital in Africa",
    description:
      "GreenLedger connects sustainable African SMEs with banks deploying green finance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreenLedger | Unlock Green Capital in Africa",
    description: "Connecting sustainable SMEs with green capital in Africa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.classList.add(theme);
                  } else {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.classList.add(prefersDark ? 'dark' : 'light');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <ThemeProvider>
          <LandingShell>{children}</LandingShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
