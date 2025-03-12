import { Box, Container, Typography, Paper, Stepper, Step, StepLabel, Button } from '@mui/material';
import BookingForm from './components/BookingForm';
import ConfirmationPage from './components/ConfirmationPage';

export default function ClientPage() {
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
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 4 }}>
            הזמנת תור
          </Typography>
          
          <BookingForm />
        </Paper>
        
        <Box mt={4} textAlign="center">
          <Button variant="outlined" href="/" sx={{ mx: 1 }}>
            חזור לדף הבית
          </Button>
        </Box>
      </Container>
    </Box>
  );
} 