import type { Metadata } from "next";
import { Noto_Sans_Hebrew } from "next/font/google";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { heIL } from '@mui/material/locale';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/he'; // Import Hebrew locale for dayjs
import "./globals.css";

// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const notoSansHebrew = Noto_Sans_Hebrew({
  weight: ['300', '400', '500', '700'],
  variable: "--font-noto-sans-hebrew",
  subsets: ["hebrew", "latin"],
});

// Create RTL theme
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'var(--font-noto-sans-hebrew), Arial, sans-serif',
  },
}, heIL);

export const metadata: Metadata = {
  title: "מערכת זימון תורים לספר",
  description: "מערכת מודרנית לזימון תורים לספר",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
            <body className={`${notoSansHebrew.variable} antialiased`}>
              {children}
            </body>
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </html>
  );
}
