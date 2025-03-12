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

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Use client-side only rendering to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  // Create rtl cache on the client side only
  const [cacheRtl] = useState(() => 
    createCache({
      key: 'muirtl',
      stylisPlugins: [prefixer, rtlPlugin],
    })
  );

  // After hydration, we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same structure but without styles
    // to avoid hydration mismatch
    return <>{children}</>;
  }

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  );
} 