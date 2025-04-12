import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import FirebaseAuthProvider from "@/components/firebase-auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MercadoClone - E-commerce",
  description: "An e-commerce platform similar to Mercado Libre",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <FirebaseAuthProvider>
            {children}
            <Toaster />
          </FirebaseAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'