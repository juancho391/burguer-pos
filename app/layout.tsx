"use client";
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/appSideBar";
import { usePathname } from "next/navigation";
import "../app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSideBar = pathname.startsWith("/login");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <SidebarProvider>
            {!hideSideBar && (
              <>
                <AppSidebar />
                <SidebarTrigger />
              </>
            )}
            {children}
          </SidebarProvider>
        </Provider>
      </body>
    </html>
  );
}
