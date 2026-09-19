import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import DashboardShell from "@/app/components/dashboard/DashboardShell";
import "./globals.css";
import styles from "./layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ScrapChef Dashboard",
  description: "ScrapChef dashboard layout shell",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className={styles.shell}>
          <header className={styles.header}>
            <div className={styles.headerInner}>
              <span className={styles.brand}>ScrapChef</span>
            </div>
          </header>
          <DashboardShell>{children}</DashboardShell>
        </div>
      </body>
    </html>
  );
}
