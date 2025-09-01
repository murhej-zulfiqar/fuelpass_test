import type {Metadata} from "next";
import "./globals.css";
import ThemeProvider from "./ThemeProvider";
import {  Roboto } from "next/font/google";
import ReactQueryProvider from "@/QueryProvider";

export const metadata: Metadata = {
    title: "Fuel pass app",
    description: "Create an app for fuel requests",
};

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-roboto',

});
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={roboto.variable}>
            <body>
                <ThemeProvider>
                    <ReactQueryProvider>
                        {children}
                    </ReactQueryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
