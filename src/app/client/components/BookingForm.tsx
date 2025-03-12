'use client';

import { useState, useEffect } from 'react';
import { Box, Grid, TextField, MenuItem, Button, Typography, Stepper, Step, StepLabel, InputLabel, FormControl, Alert, Snackbar, Paper, Divider, FormHelperText } from '@mui/material';
import { CheckCircleOutline, Close as CloseIcon, ErrorOutline } from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';
import 'dayjs/locale/he'; // Import Hebrew locale for dayjs

const steps = ['בחירת תאריך ושעה', 'פרטים נוספים', 'סיכום'];

// שעות העבודה של המספרה
const workingHours = {
  0: { start: '09:00', end: '20:00' }, // יום ראשון
  1: { start: '09:00', end: '20:00' }, // יום שני
  2: { start: '09:00', end: '20:00' }, // יום שלישי
  3: { start: '09:00', end: '20:00' }, // יום רביעי
  4: { start: '08:00', end: '21:00' }, // יום חמישי
  5: { start: '08:00', end: '15:00' }, // יום שישי
  6: { start: '', end: '' }, // יום שבת - סגור
};

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
  const [timeError, setTimeError] = useState<string | null>(null);

  const handleNext = () => {
    if (activeStep === 0 && !isTimeValid()) {
      return;
    }
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

  // בדיקה האם התאריך והשעה שנבחרו תקינים
  const isTimeValid = () => {
    if (!date || !time) return true; // אם לא נבחר תאריך או שעה, אין צורך בבדיקה
    
    const dayOfWeek = date.day();
    
    // בדיקה אם יום שבת (סגור)
    if (dayOfWeek === 6) {
      setTimeError('המספרה סגורה בימי שבת');
      return false;
    }
    
    const selectedHour = time.hour();
    const selectedMinute = time.minute();
    
    // המרת שעות העבודה לפורמט של דקות מתחילת היום
    const dayHours = workingHours[dayOfWeek as keyof typeof workingHours];
    const [startHour, startMinute] = dayHours.start.split(':').map(Number);
    const [endHour, endMinute] = dayHours.end.split(':').map(Number);
    
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    const selectedTimeInMinutes = selectedHour * 60 + selectedMinute;
    
    // בדיקה אם השעה שנבחרה היא מחוץ לשעות העבודה
    if (selectedTimeInMinutes < startTimeInMinutes || selectedTimeInMinutes > endTimeInMinutes) {
      setTimeError(`שעות הפעילות ביום זה הן ${dayHours.start} - ${dayHours.end}`);
      return false;
    }
    
    setTimeError(null);
    return true;
  };

  // בדיקת תקינות בכל פעם שמשתנה התאריך או השעה
  useEffect(() => {
    if (date && time) {
      isTimeValid();
    }
  }, [date, time]);

  const isStepOneValid = date && time && !timeError;
  const isStepTwoValid = name && contactInfo;

  // If the form is submitted, show a success page
  if (isSubmitted) {
    return (
      <Box 
        component={motion.div}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          textAlign: 'center', 
          py: 4,
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Paper 
          elevation={4} 
          sx={{ 
            p: { xs: 3, md: 5 }, 
            borderRadius: 3, 
            maxWidth: 650, 
            mx: 'auto', 
            position: 'relative',
            background: 'linear-gradient(to bottom, #ffffff, #f9f9f9)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
          }}
        >
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              height: '8px', 
              background: 'linear-gradient(90deg, #4caf50, #8bc34a)',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12
            }} 
          />
          
          <Box 
            component={motion.div}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ 
              width: 100, 
              height: 100, 
              borderRadius: '50%', 
              background: 'rgba(76, 175, 80, 0.1)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              mx: 'auto',
              mb: 3
            }}
          >
            <CheckCircleOutline 
              color="success" 
              sx={{ 
                fontSize: 60,
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)', opacity: 1 },
                  '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                  '100%': { transform: 'scale(1)', opacity: 1 },
                }
              }} 
            />
          </Box>
          
          <Typography 
            variant="h4" 
            gutterBottom 
            color="primary"
            component={motion.h2}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            הבקשה נשלחה בהצלחה!
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph
            component={motion.p}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            sx={{ mb: 4, color: 'text.secondary', fontSize: '1.1rem' }}
          >
            אנו ניצור איתך קשר עם אישור התור באמצעות {notificationMethod}.
          </Typography>
          
          <Divider sx={{ my: 4 }} />
          
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                fontWeight: 500,
                display: 'inline-block',
                borderBottom: '2px solid #4caf50',
                paddingBottom: 1
              }}
            >
              פרטי ההזמנה
            </Typography>
            
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 3, 
                borderRadius: 2, 
                background: 'rgba(0,0,0,0.02)',
                mb: 4
              }}
            >
              <Box>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 1.5,
                  borderBottom: '1px dashed rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>שם:</Typography>
                  <Typography variant="body1" fontWeight="medium">{name}</Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 1.5,
                  borderBottom: '1px dashed rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>תאריך:</Typography>
                  <Typography variant="body1" fontWeight="medium">{date?.format('DD/MM/YYYY')}</Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 1.5,
                  borderBottom: '1px dashed rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>שעה:</Typography>
                  <Typography variant="body1" fontWeight="medium">{time?.format('HH:mm')}</Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 1.5,
                  borderBottom: '1px dashed rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>כמות אנשים:</Typography>
                  <Typography variant="body1" fontWeight="medium">{peopleCount}</Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 1.5,
                  borderBottom: '1px dashed rgba(0,0,0,0.1)'
                }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>אמצעי התראה:</Typography>
                  <Typography variant="body1" fontWeight="medium">{notificationMethod}</Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  py: 1.5
                }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 500 }}>פרטי קשר:</Typography>
                  <Typography variant="body1" fontWeight="medium">{contactInfo}</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
          
          <Box 
            sx={{ 
              mt: 4, 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' }
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={resetForm}
              startIcon={<CloseIcon />}
              sx={{ 
                py: 1.5, 
                px: 3, 
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.2)'
              }}
            >
              סגור וחזור לטופס
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              onClick={() => window.location.href = '/'}
              sx={{ py: 1.5, px: 3, borderRadius: 2 }}
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
          <Alert 
            severity="success" 
            sx={{ 
              width: '100%',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
          >
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
                  onChange={(newValue) => {
                    setDate(newValue);
                    setTimeError(null); // איפוס שגיאות בעת שינוי תאריך
                  }}
                  sx={{ width: '100%' }}
                  disablePast
                  shouldDisableDate={(date) => date.day() === 6} // חסימת ימי שבת
                  slotProps={{
                    textField: {
                      id: "booking-date",
                      name: "booking-date",
                      inputProps: {
                        'aria-label': 'תאריך'
                      },
                      helperText: "ימי שבת וחגים המספרה סגורה"
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TimePicker
                  label="שעה"
                  value={time}
                  onChange={(newValue) => {
                    setTime(newValue);
                    setTimeError(null); // איפוס שגיאות בעת שינוי שעה
                  }}
                  sx={{ width: '100%' }}
                  slotProps={{
                    textField: {
                      id: "booking-time",
                      name: "booking-time",
                      inputProps: {
                        'aria-label': 'שעה'
                      },
                      error: !!timeError,
                      helperText: timeError || "בחר שעה בהתאם לשעות הפעילות"
                    }
                  }}
                />
              </Grid>
              {timeError && (
                <Grid item xs={12}>
                  <Alert 
                    severity="error" 
                    icon={<ErrorOutline />}
                    sx={{ mt: 1 }}
                  >
                    {timeError}
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography variant="subtitle2" color="text.secondary">
                  שעות פעילות:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ימים א-ד: 09:00-20:00 | יום ה: 08:00-21:00 | יום ו: 08:00-15:00 | שבת: סגור
                </Typography>
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