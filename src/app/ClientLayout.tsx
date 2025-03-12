"use client";

import { useState, useEffect } from 'react';
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

// Create RTL theme
const theme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'var(--font-noto-sans-hebrew), Arial, sans-serif',
  },
}, heIL);

// Create rtl cache
const cacheRtl = typeof window !== 'undefined' 
  ? createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
    })
  : null;

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use client-side only rendering to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  // After hydration, we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // During SSR and initial client render, return a simple placeholder
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  // Only render the full UI after hydration and when cacheRtl is available
  return cacheRtl ? (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  ) : null;
} 