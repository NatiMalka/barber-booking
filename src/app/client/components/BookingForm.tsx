'use client';

import { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Button, Typography, Stepper, Step, StepLabel, InputLabel, FormControl, Alert, Snackbar, Paper, Divider } from '@mui/material';
import { CheckCircleOutline, Close as CloseIcon } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import 'dayjs/locale/he'; // Import Hebrew locale for dayjs

const steps = ['בחירת תאריך ושעה', 'פרטים נוספים', 'סיכום'];

export default function BookingForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [notificationMethod, setNotificationMethod] = useState('WhatsApp');
  const [contactInfo, setContactInfo] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to Firebase
    
    // Instead of using alert, we'll set a state to show success UI
    setIsSubmitted(true);
    setShowSuccessMessage(true);
  };

  const resetForm = () => {
    setActiveStep(0);
    setDate(null);
    setTime(null);
    setPeopleCount(1);
    setNotificationMethod('WhatsApp');
    setContactInfo('');
    setName('');
    setIsSubmitted(false);
  };

  const isStepOneValid = date && time;
  const isStepTwoValid = name && contactInfo;

  // If the form is submitted, show a success page
  if (isSubmitted) {
    return (
      <Box 
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ textAlign: 'center', py: 4 }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, maxWidth: 600, mx: 'auto', position: 'relative' }}>
          <CheckCircleOutline 
            color="success" 
            sx={{ 
              fontSize: 80, 
              mb: 2,
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.1)' },
                '100%': { transform: 'scale(1)' },
              }
            }} 
          />
          
          <Typography variant="h4" gutterBottom color="primary">
            הבקשה נשלחה בהצלחה!
          </Typography>
          
          <Typography variant="body1" paragraph>
            אנו ניצור איתך קשר עם אישור התור באמצעות {notificationMethod}.
          </Typography>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            פרטי ההזמנה:
          </Typography>
          
          <Grid container spacing={2} sx={{ mt: 2, textAlign: 'right' }}>
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">שם:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{name}</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">תאריך:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{date?.format('DD/MM/YYYY')}</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">שעה:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{time?.format('HH:mm')}</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">כמות אנשים:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{peopleCount}</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">אמצעי התראה:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{notificationMethod}</Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="subtitle1" fontWeight="bold">פרטי קשר:</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">{contactInfo}</Typography>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={resetForm}
              startIcon={<CloseIcon />}
            >
              סגור וחזור לטופס
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.location.href = '/'}
            >
              חזור לדף הבית
            </Button>
          </Box>
        </Paper>
        
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={4000}
          onClose={() => setShowSuccessMessage(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }}>
            הבקשה נשלחה בהצלחה!
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box component={motion.div} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="תאריך"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  sx={{ width: '100%' }}
                  disablePast
                  slotProps={{
                    textField: {
                      id: "booking-date",
                      name: "booking-date",
                      inputProps: {
                        'aria-label': 'תאריך'
                      }
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TimePicker
                  label="שעה"
                  value={time}
                  onChange={(newValue) => setTime(newValue)}
                  sx={{ width: '100%' }}
                  slotProps={{
                    textField: {
                      id: "booking-time",
                      name: "booking-time",
                      inputProps: {
                        'aria-label': 'שעה'
                      }
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box component={motion.div} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="full-name"
                  name="full-name"
                  label="שם מלא"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  inputProps={{
                    'aria-label': 'שם מלא'
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="people-count"
                  name="people-count"
                  label="כמות אנשים"
                  variant="outlined"
                  select
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(Number(e.target.value))}
                  required
                  inputProps={{
                    'aria-label': 'כמות אנשים'
                  }}
                >
                  {[1, 2, 3, 4, 5].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="notification-method"
                  name="notification-method"
                  label="אמצעי התראה מועדף"
                  variant="outlined"
                  select
                  value={notificationMethod}
                  onChange={(e) => setNotificationMethod(e.target.value)}
                  required
                  inputProps={{
                    'aria-label': 'אמצעי התראה מועדף'
                  }}
                >
                  {['WhatsApp', 'Email', 'SMS'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="contact-info"
                  name="contact-info"
                  label={notificationMethod === 'Email' ? 'דוא"ל' : 'מספר טלפון'}
                  variant="outlined"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  required
                  type={notificationMethod === 'Email' ? 'email' : 'tel'}
                  inputProps={{
                    'aria-label': notificationMethod === 'Email' ? 'דוא"ל' : 'מספר טלפון'
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box component={motion.div} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            sx={{ textAlign: 'center' }}
          >
            <Typography variant="h5" gutterBottom>
              אישור פרטים
            </Typography>
            <Grid container spacing={2} sx={{ mt: 2, textAlign: 'right' }}>
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">שם:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{name}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">תאריך:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{date?.format('DD/MM/YYYY')}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">שעה:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{time?.format('HH:mm')}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">כמות אנשים:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{peopleCount}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">אמצעי התראה:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{notificationMethod}</Typography>
              </Grid>
              
              <Grid item xs={6}>
                <Typography variant="subtitle1" fontWeight="bold">פרטי קשר:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{contactInfo}</Typography>
              </Grid>
            </Grid>
            
            <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
              לאחר אישור הפרטים, הבקשה תישלח לספר. תקבל הודעת אישור באמצעי ההתראה שבחרת.
            </Typography>
          </Box>
        );
      default:
        return 'שלב לא ידוע';
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
      <Box component="form" id="booking-form" name="booking-form" noValidate onSubmit={handleSubmit}>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel id={`step-label-${index}`}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Box sx={{ py: 4 }}>
          {getStepContent(activeStep)}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            id="back-button"
            name="back-button"
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            חזור
          </Button>
          
          <Button
            id="next-button"
            name="next-button"
            variant="contained"
            color="primary"
            onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={(activeStep === 0 && !isStepOneValid) || (activeStep === 1 && !isStepTwoValid)}
            type={activeStep === steps.length - 1 ? "submit" : "button"}
          >
            {activeStep === steps.length - 1 ? 'שלח בקשה' : 'המשך'}
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
} 