import "./globals.css";
import AppWalletProvider from "./components/AppWalletProvider";
import SideNavBar from "./components/sideNavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex justify-center">
        <SideNavBar></SideNavBar>
        <AppWalletProvider>{children}</AppWalletProvider>
      </body>
    </html>
  );
}
