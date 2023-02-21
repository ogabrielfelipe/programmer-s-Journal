"use client";
import { AuthProvider } from '@/lib/AuthContext'
import { ToastContainer } from 'react-toastify'
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { SideBarVertical } from '@/components/sideBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <head />
      <body>
        <AuthProvider>
        <ToastContainer 
          autoClose={3000} 
          position="top-right"
          theme='dark'
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
          {children}  
        </AuthProvider>
      </body>
    </html>
  )
}
