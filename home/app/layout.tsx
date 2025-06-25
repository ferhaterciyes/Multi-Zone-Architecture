import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Home',
  description: 'Home Uygulaması',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: '8px',
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
