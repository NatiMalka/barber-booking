'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Paper, Grid, Alert, Snackbar } from '@mui/material';
import { CalendarMonth, Person, Notifications, ContentCut } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { db, checkFirebaseConnection } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import WorkingHours from './components/WorkingHours';

export default function Home() {
  // Use client-side only rendering to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [firebaseError, setFirebaseError] = useState<string | null>(null);

  useEffect(() => {
    // Mark as mounted after hydration
    setMounted(true);
    
    // Test Firebase connection
    const testFirebaseConnection = async () => {
      try {
        // Check if Firebase is blocked
        const connectionStatus = await checkFirebaseConnection();
        if (!connectionStatus.connected) {
          setFirebaseError(connectionStatus.error);
          return;
        }

        // If not blocked, try to access Firestore
        const testCollection = collection(db, 'test');
        await getDocs(testCollection);
        console.log('Successfully connected to Firebase!');
      } catch (error) {
        console.error('Error connecting to Firebase:', error);
        setFirebaseError('Error connecting to Firebase. This might be due to an ad blocker or privacy extension.');
      }
    };

    testFirebaseConnection();
  }, []);

  // During SSR and initial client render, return a simple placeholder
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>Loading...</div>;
  }

  // Only render the full UI after hydration
  return (
    <main>
      {/* Firebase Error Alert */}
      <Snackbar open={!!firebaseError} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity="warning" sx={{ width: '100%' }}>
          {firebaseError}
        </Alert>
      </Snackbar>

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="animated-gradient-bg"
        sx={{
          minHeight: '100vh',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box 
            component={motion.div}
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ textAlign: 'center', mb: 6 }}
          >
            <Typography variant="h2" component="h1" sx={{ color: 'var(--text-dark)', fontWeight: 'bold', mb: 2 }}>
              מספרת בר ארזי
            </Typography>
            <Typography variant="h5" sx={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ContentCut sx={{ mr: 1, transform: 'rotate(90deg)' }} /> עיצוב שיער <ContentCut sx={{ ml: 1, transform: 'rotate(-90deg)' }} />
            </Typography>
          </Box>
          
          {/* Working Hours */}
          <WorkingHours />
          
          {/* Main Content */}
          <Grid container spacing={4} justifyContent="center">
            {/* Client Section */}
            <Grid item xs={12} md={6}>
              <Paper 
                component={motion.div}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                  לקוחות
                </Typography>
                <Box sx={{ textAlign: 'center', my: 3 }}>
                  <Person sx={{ fontSize: 80, color: 'primary.main' }} />
                </Box>
                <Typography variant="body1" paragraph align="center">
                  הזמן תור חדש, צפה בתורים קיימים, או בטל תורים בקלות ובמהירות.
                </Typography>
                <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                  <Button 
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="contained" 
                    size="large" 
                    onClick={() => window.location.href = '/client'}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      fontSize: '1.1rem'
                    }}
                  >
                    כניסה למערכת הלקוחות
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            {/* Admin Section */}
            <Grid item xs={12} md={6}>
              <Paper 
                component={motion.div}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                  ניהול (ספר)
                </Typography>
                <Box sx={{ textAlign: 'center', my: 3 }}>
                  <CalendarMonth sx={{ fontSize: 80, color: 'secondary.main' }} />
                </Box>
                <Typography variant="body1" paragraph align="center">
                  נהל תורים, צפה בלוח זמנים, אשר או דחה בקשות לתורים.
                </Typography>
                <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                  <Button 
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="contained" 
                    color="secondary" 
                    size="large" 
                    onClick={() => window.location.href = '/admin'}
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      fontSize: '1.1rem'
                    }}
                  >
                    כניסה לממשק הניהול
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Features Section */}
          <Box 
            component={motion.div}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            sx={{ mt: 8, textAlign: 'center' }}
          >
            <Typography variant="h4" component="h2" sx={{ color: 'var(--primary-dark)', mb: 4 }}>
              למה כדאי להשתמש במערכת שלנו?
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Paper
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  sx={{ p: 3, borderRadius: 3, height: '100%' }}
                >
                  <CalendarMonth sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    זימון תורים מהיר
                  </Typography>
                  <Typography variant="body2">
                    קבע תור במספר קליקים פשוטים, בדוק זמינות בזמן אמת.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  sx={{ p: 3, borderRadius: 3, height: '100%' }}
                >
                  <Notifications sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    התראות אוטומטיות
                  </Typography>
                  <Typography variant="body2">
                    קבל תזכורות על תורים קרובים דרך וואטסאפ, אימייל או SMS.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  sx={{ p: 3, borderRadius: 3, height: '100%' }}
                >
                  <Person sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    ניהול פרופיל אישי
                  </Typography>
                  <Typography variant="body2">
                    צפה בהיסטוריית התורים שלך ונהל את הפרטים האישיים בקלות.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          
          {/* Footer */}
          <Box
            component={motion.footer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            sx={{ 
              mt: 8, 
              pt: 3, 
              textAlign: 'center',
              color: 'var(--primary-dark)',
              borderTop: '1px solid rgba(30, 60, 114, 0.2)'
            }}
          >
            <Typography variant="body2">
              © {new Date().getFullYear()} מספרת בר ארזי | כל הזכויות שמורות
            </Typography>
          </Box>
        </Container>
      </Box>
    </main>
  );
}
