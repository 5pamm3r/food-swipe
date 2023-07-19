import RecipeProvider from '@/context/recipeContext'
import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Food Swipe',
  description: 'Drag and drop your favorite recipes'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={inter.className}>
        <RecipeProvider>
          {children}
        </RecipeProvider>
      </body>
    </html>
  )
}
