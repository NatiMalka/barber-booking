'use client';

import { Box, Typography, Paper, Button, Chip } from '@mui/material';
import { CheckCircle, AccessTime } from '@mui/icons-material';
import { motion } from 'framer-motion';

interface ConfirmationPageProps {
  appointmentData?: {
    name: string;
    date: string;
    time: string;
    peopleCount: number;
    notificationMethod: string;
    status: 'pending' | 'approved' | 'rejected';
  };
}

export default function ConfirmationPage({ appointmentData }: ConfirmationPageProps) {
  // This is a placeholder for demo purposes
  const appointment = appointmentData || {
    name: 'ישראל ישראלי',
    date: '15/04/2024',
    time: '14:30',
    peopleCount: 1,
    notificationMethod: 'WhatsApp',
    status: 'pending' as const,
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Box component={motion.div} 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ maxWidth: 600, mx: 'auto', p: 3 }}
    >
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
        <Box component={motion.div} variants={itemVariants}>
          {appointment.status === 'pending' ? (
            <AccessTime sx={{ fontSize: 70, color: 'warning.main', mb: 2 }} />
          ) : (
            <CheckCircle sx={{ fontSize: 70, color: 'success.main', mb: 2 }} />
          )}
          
          <Typography variant="h4" gutterBottom>
            {appointment.status === 'pending' 
              ? 'הבקשה נשלחה בהצלחה!' 
              : 'התור אושר!'}
          </Typography>
          
          <Chip 
            label={
              appointment.status === 'pending' 
                ? 'ממתין לאישור' 
                : appointment.status === 'approved' 
                  ? 'מאושר' 
                  : 'נדחה'
            }
            color={
              appointment.status === 'pending' 
                ? 'warning' 
                : appointment.status === 'approved' 
                  ? 'success' 
                  : 'error'
            }
            sx={{ mb: 3 }}
          />
        </Box>
        
        <Box component={motion.div} variants={itemVariants} sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            פרטי התור:
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2, 
            maxWidth: 400, 
            mx: 'auto',
            textAlign: 'right',
            mt: 2
          }}>
            <Typography variant="body1" fontWeight="bold">שם:</Typography>
            <Typography variant="body1">{appointment.name}</Typography>
            
            <Typography variant="body1" fontWeight="bold">תאריך:</Typography>
            <Typography variant="body1">{appointment.date}</Typography>
            
            <Typography variant="body1" fontWeight="bold">שעה:</Typography>
            <Typography variant="body1">{appointment.time}</Typography>
            
            <Typography variant="body1" fontWeight="bold">כמות אנשים:</Typography>
            <Typography variant="body1">{appointment.peopleCount}</Typography>
          </Box>
        </Box>
        
        <Box component={motion.div} variants={itemVariants} sx={{ mt: 4 }}>
          <Typography variant="body2" color="text.secondary" paragraph>
            {appointment.status === 'pending' 
              ? `תקבל הודעה באמצעות ${appointment.notificationMethod} כאשר הספר יאשר את התור.`
              : `הודעת אישור נשלחה אליך באמצעות ${appointment.notificationMethod}.`
            }
          </Typography>
          
          <Button variant="outlined" href="/" sx={{ mt: 2 }}>
            חזרה לדף הבית
          </Button>
        </Box>
      </Paper>
    </Box>
  );
} 