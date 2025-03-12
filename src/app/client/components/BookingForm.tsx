'use client';

import { useState } from 'react';
import { Box, Grid, TextField, MenuItem, Button, Typography, Stepper, Step, StepLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { motion } from 'framer-motion';
import dayjs from 'dayjs';

const steps = ['בחירת תאריך ושעה', 'פרטים נוספים', 'סיכום'];

export default function BookingForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [time, setTime] = useState<dayjs.Dayjs | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [notificationMethod, setNotificationMethod] = useState('WhatsApp');
  const [contactInfo, setContactInfo] = useState('');
  const [name, setName] = useState('');

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the data to Firebase
    alert('הבקשה נשלחה בהצלחה! אנו ניצור איתך קשר עם אישור התור.');
    // Reset form after submission
    setActiveStep(0);
    setDate(null);
    setTime(null);
    setPeopleCount(1);
    setNotificationMethod('WhatsApp');
    setContactInfo('');
    setName('');
  };

  const isStepOneValid = date && time;
  const isStepTwoValid = name && contactInfo;

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
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TimePicker
                  label="שעה"
                  value={time}
                  onChange={(newValue) => setTime(newValue)}
                  sx={{ width: '100%' }}
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
                  label="שם מלא"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="כמות אנשים"
                  variant="outlined"
                  select
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(Number(e.target.value))}
                  required
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
                  label="אמצעי התראה מועדף"
                  variant="outlined"
                  select
                  value={notificationMethod}
                  onChange={(e) => setNotificationMethod(e.target.value)}
                  required
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
                  label={notificationMethod === 'Email' ? 'דוא"ל' : 'מספר טלפון'}
                  variant="outlined"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  required
                  type={notificationMethod === 'Email' ? 'email' : 'tel'}
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
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ py: 4 }}>
        {getStepContent(activeStep)}
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
          variant="outlined"
        >
          חזור
        </Button>
        
        <Button
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
  );
} 