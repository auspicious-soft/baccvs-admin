import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/utils/ReactQueryProvider";
import { AuthProvider, useAuth } from "@/utils/Auth";
import ProtectedRoute from "@/components/ProtectRoute";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Baccvs",
  description: "Baccvs",
};
const SatoshiRegular = localFont({
  src: "../assets/fonts/Satoshi-Regular.otf",
  display: "swap",
  variable: "--font-satoshi-regular",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`h-[100vh] w-[100vw] antialiased`}>
        {" "}
        <ReactQueryProvider>
          <AuthProvider>
            <ProtectedRoute>{children}</ProtectedRoute>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
