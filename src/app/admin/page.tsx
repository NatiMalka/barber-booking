'use client';

import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, ContentCut } from '@mui/icons-material';
import { motion } from 'framer-motion';

// This would normally be stored securely in environment variables
const ADMIN_PASSWORD = 'admin123';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      // Navigate to dashboard on successful login using direct navigation
      window.location.href = '/admin/dashboard';
    } else {
      setError(true);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: '100vh',
        py: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          component={motion.div}
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
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
              כניסת מנהל 
              <ContentCut sx={{ ml: 1, transform: 'rotate(-90deg)', fontSize: '1rem' }} />
            </Typography>
          </Box>
          
          <Box component="form" id="admin-login-form" name="admin-login-form" onSubmit={handleSubmit} noValidate>
            <TextField
              id="admin-password"
              name="admin-password"
              fullWidth
              margin="normal"
              label="סיסמה"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError(false);
              }}
              error={error}
              helperText={error ? 'סיסמה שגויה' : ''}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="toggle-password-visibility"
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              inputProps={{
                'aria-label': 'סיסמה'
              }}
            />
            
            <Button
              id="admin-login-submit"
              name="admin-login-submit"
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 4, mb: 2 }}
            >
              כניסה
            </Button>
            
            <Button
              id="back-to-home"
              name="back-to-home"
              fullWidth
              variant="outlined"
              onClick={() => window.location.href = '/'}
              sx={{ mt: 1 }}
            >
              חזור לדף הבית
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 