'use client';

import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import { AccessTime, Event } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function WorkingHours() {
  const workingHours = [
    { day: 'ימי א - ד', hours: '09:00 - 20:00' },
    { day: 'יום ה', hours: '08:00 - 21:00' },
    { day: 'יום ו', hours: '08:00 - 15:00' },
    { day: 'ערבי חג', hours: 'במתכונת ימי שישי' },
    { day: 'שבת וחגים', hours: 'סגור' }
  ];

  return (
    <Paper 
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      elevation={3}
      sx={{ 
        p: 3, 
        borderRadius: 2,
        mb: 4
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <AccessTime color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          שעות פעילות המספרה
        </Typography>
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Grid container spacing={1}>
        {workingHours.map((item, index) => (
          <Grid item xs={12} key={index} sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            py: 0.5,
            borderBottom: index < workingHours.length - 1 ? '1px dashed rgba(0,0,0,0.1)' : 'none'
          }}>
            <Typography variant="body1" fontWeight={item.day === 'שבת וחגים' ? 'bold' : 'normal'}>
              {item.day}
            </Typography>
            <Typography 
              variant="body1" 
              color={item.day === 'שבת וחגים' ? 'error.main' : 'text.primary'}
              fontWeight={item.day === 'שבת וחגים' ? 'bold' : 'normal'}
            >
              {item.hours}
            </Typography>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
        <Event fontSize="small" color="info" sx={{ mr: 1 }} />
        <Typography variant="body2" color="text.secondary">
          ערבי חג המספרה פתוחה במתכונת ימי שישי. ימי שבת וחגים המספרה סגורה.
        </Typography>
      </Box>
    </Paper>
  );
} 