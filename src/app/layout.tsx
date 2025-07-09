 
import type { Metadata } from "next";
import "./globals.css";
import { inter, poppins } from "@/fonts/fonts";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Trading App",
  description: "A trading app built with Next.js and Tailwind CSS",
}; 

import ClientWrapper from "./ClientWrapper";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
       
      
    
      <body className={`${poppins.className} antialiased bg-[#13131f]`}>
        <ClientWrapper>
          {children}
          <Toaster />
        <Footer />
        </ClientWrapper>
        
      </body> 
    </html>
  );
}
