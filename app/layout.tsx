import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Box, Container } from '@mui/material';
import LeftNavBar from './_components/LeftNavBar';
import { ThemeProvider } from './_contexts/ThemeContext';
import AlertProvider from './_contexts/AlertProvider';
import ReactQueryProvider from './_contexts/ReactQueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Base Runtime Environment',
  description: 'Base Runtime Environment setup',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <AlertProvider>
              <ReactQueryProvider>
                <Box sx={{ display: 'flex' }}>
                  <LeftNavBar />
                  <Box sx={{ flex: 1, width: '100%' }}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%' }}>
                        <Container maxWidth="lg" sx={{ py: 4 }}>
                          <main>
                            {children}
                          </main>
                        </Container>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </ReactQueryProvider>
            </AlertProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
