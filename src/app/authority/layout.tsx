import type { Metadata } from "next";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";


export const metadata: Metadata = {
  title: "Baccvs",
  description: "Baccvs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en">
      <div
        style={{ background: "#FFFFFF" }}
        className={`h-[100vh] antialiased`}
      >
        <div className="flex h-[100%] w-[100%] overflow-hidden">
          <TopBar  >{children}</TopBar>
          {/* <div className="pt-8 pb-6 pr-4 w-[100%] overflow-y-auto">{children}</div> */}
        </div>
      </div>
    // </html>
  );
}
