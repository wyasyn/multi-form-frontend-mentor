import type { Metadata } from "next";
import "./globals.css";

import { Ubuntu as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap",
    variable: "--font-sans",
});

export const metadata: Metadata = {
    title: "Frontend Mentor - Multi-step form",
    description:
        "This is a  challenge to build out this multi-step form and get it looking as close to the design as possible.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(" font-sans antialiased", fontSans.variable)}>
                {children}
            </body>
        </html>
    );
}
