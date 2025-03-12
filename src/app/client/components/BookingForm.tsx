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

const steps = ['פרטים אישיים', 'בחירת תאריך ושעה', 'סיכום'];

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

  // פונקציה ליצירת חלונות זמן אפשריים בהתאם ליום שנבחר
  const generateTimeSlots = (dayOfWeek: number): string[] => {
    if (dayOfWeek === 6) return []; // יום שבת סגור
    
    const dayHours = workingHours[dayOfWeek as keyof typeof workingHours];
    const [startHour, startMinute] = dayHours.start.split(':').map(Number);
    const [endHour, endMinute] = dayHours.end.split(':').map(Number);
    
    const startTimeInMinutes = startHour * 60 + startMinute;
    const endTimeInMinutes = endHour * 60 + endMinute;
    
    const timeSlots: string[] = [];
    // יצירת חלונות זמן של 30 דקות
    for (let minutes = startTimeInMinutes; minutes <= endTimeInMinutes - 30; minutes += 30) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      timeSlots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }
    
    return timeSlots;
  };

  const handleNext = () => {
    if (activeStep === 1 && !isTimeValid()) {
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

  // כאשר משתנה התאריך, נאפס את השעה שנבחרה
  useEffect(() => {
    if (date) {
      setTime(null);
      setTimeError(null);
    }
  }, [date]);

  const isStepOneValid = name && contactInfo;
  const isStepTwoValid = date && time && !timeError;

  return (
    <Box sx={{ width: '100%', mt: 4 }}>
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            {activeStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h6" gutterBottom align="center">
                  פרטים אישיים
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      id="name"
                      name="name"
                      label="שם מלא"
                      fullWidth
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="people-count"
                      name="people-count"
                      label="מספר מסתפרים"
                      type="number"
                      fullWidth
                      InputProps={{ inputProps: { min: 1, max: 10 } }}
                      value={peopleCount}
                      onChange={(e) => setPeopleCount(parseInt(e.target.value))}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="notification-method"
                      name="notification-method"
                      select
                      label="שיטת התראה מועדפת"
                      fullWidth
                      value={notificationMethod}
                      onChange={(e) => setNotificationMethod(e.target.value)}
                    >
                      <MenuItem value="WhatsApp">WhatsApp</MenuItem>
                      <MenuItem value="SMS">SMS</MenuItem>
                      <MenuItem value="Email">אימייל</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="contact-info"
                      name="contact-info"
                      label={notificationMethod === 'Email' ? 'כתובת אימייל' : 'מספר טלפון'}
                      fullWidth
                      required
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </motion.div>
            )}

            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h6" gutterBottom align="center">
                  בחירת תאריך ושעה
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
                      <DatePicker
                        label="תאריך"
                        value={date}
                        onChange={(newDate) => setDate(newDate)}
                        disablePast
                        sx={{ width: '100%' }}
                        slotProps={{
                          textField: {
                            id: "booking-date",
                            name: "booking-date",
                            required: true,
                            helperText: "בחר תאריך לתור"
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                  
                  {date && (
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        בחר שעה:
                      </Typography>
                      
                      {date.day() === 6 ? (
                        <Alert severity="info" sx={{ mb: 2 }}>
                          המספרה סגורה בימי שבת
                        </Alert>
                      ) : (
                        <>
                          <Typography variant="body2" color="text.secondary" gutterBottom>
                            שעות פעילות ביום {['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'][date.day()]}: 
                            {workingHours[date.day() as keyof typeof workingHours].start} - 
                            {workingHours[date.day() as keyof typeof workingHours].end}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                            {generateTimeSlots(date.day()).map((timeSlot: string) => (
                              <Button
                                key={timeSlot}
                                variant={time && time.format('HH:mm') === timeSlot ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => {
                                  const [hours, minutes] = timeSlot.split(':').map(Number);
                                  const newTime = dayjs().hour(hours).minute(minutes);
                                  setTime(newTime);
                                  setTimeError(null);
                                }}
                                sx={{ minWidth: '80px' }}
                              >
                                {timeSlot}
                              </Button>
                            ))}
                          </Box>
                        </>
                      )}
                      
                      {timeError && (
                        <FormHelperText error>{timeError}</FormHelperText>
                      )}
                    </Grid>
                  )}
                </Grid>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h6" gutterBottom align="center">
                  סיכום הזמנה
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">שם:</Typography>
                    <Typography variant="body1">{name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">מספר מסתפרים:</Typography>
                    <Typography variant="body1">{peopleCount}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">תאריך:</Typography>
                    <Typography variant="body1">{date?.format('DD/MM/YYYY')}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">שעה:</Typography>
                    <Typography variant="body1">{time?.format('HH:mm')}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="subtitle1">פרטי התקשרות:</Typography>
                    <Typography variant="body1">{contactInfo} ({notificationMethod})</Typography>
                  </Grid>
                </Grid>
              </motion.div>
            )}
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              חזרה
            </Button>
            <Box>
              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isStepOneValid || !isStepTwoValid}
                >
                  שליחת בקשה
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  disabled={activeStep === 0 ? !isStepOneValid : !isStepTwoValid}
                >
                  המשך
                </Button>
              )}
            </Box>
          </Box>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: 2,
              maxWidth: 600,
              mx: 'auto',
              backgroundColor: '#f9f9f9'
            }}
          >
            <CheckCircleOutline 
              color="success" 
              sx={{ fontSize: 80, mb: 2 }} 
            />
            <Typography variant="h4" gutterBottom>
              הבקשה נשלחה בהצלחה!
            </Typography>
            <Typography variant="body1" paragraph sx={{ mb: 3 }}>
              קיבלנו את בקשתך לתור בתאריך {date?.format('DD/MM/YYYY')} בשעה {time?.format('HH:mm')}.
              נשלח לך אישור באמצעות {notificationMethod === 'Email' ? 'אימייל' : notificationMethod} בקרוב.
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                פרטי ההזמנה:
              </Typography>
              <Grid container spacing={2} sx={{ textAlign: 'left', mt: 1 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">שם:</Typography>
                  <Typography variant="body2">{name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">מספר מסתפרים:</Typography>
                  <Typography variant="body2">{peopleCount}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">תאריך:</Typography>
                  <Typography variant="body2">{date?.format('DD/MM/YYYY')}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">שעה:</Typography>
                  <Typography variant="body2">{time?.format('HH:mm')}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">פרטי התקשרות:</Typography>
                  <Typography variant="body2">{contactInfo}</Typography>
                </Grid>
              </Grid>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={resetForm}
              sx={{ mt: 4 }}
            >
              הזמנה חדשה
            </Button>
          </Paper>
        </motion.div>
      )}

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowSuccessMessage(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          הבקשה נשלחה בהצלחה!
        </Alert>
      </Snackbar>
    </Box>
  );
} 