'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Stepper, Step, StepLabel, Button } from '@mui/material';
import { ContentCut } from '@mui/icons-material';
import { motion } from 'framer-motion';
import BookingForm from './components/BookingForm';
import ConfirmationPage from './components/ConfirmationPage';

export default function ClientPage() {
  // Use client-side only rendering to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mark as mounted after hydration
    setMounted(true);
  }, []);

  // During SSR and initial client render, return a simple placeholder
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>Loading...</div>;
  }

  // Only render the full UI after hydration
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              מספרת בר ארזי
            </Typography>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
              <ContentCut sx={{ mr: 1, transform: 'rotate(90deg)', fontSize: '1rem' }} /> 
              הזמנת תור 
              <ContentCut sx={{ ml: 1, transform: 'rotate(-90deg)', fontSize: '1rem' }} />
            </Typography>
          </Box>
          
          <BookingForm />
        </Paper>
        
        <Box mt={4} textAlign="center">
          <Button variant="outlined" onClick={() => window.location.href = '/'} sx={{ mx: 1 }}>
            חזור לדף הבית
          </Button>
        </Box>
      </Container>
    </Box>
  );
} 