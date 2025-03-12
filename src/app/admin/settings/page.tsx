'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Grid, FormControlLabel, Checkbox, 
  Button, TextField, IconButton, Switch, Card, CardContent, Divider, Alert } from '@mui/material';
import { ArrowBack, Add, Delete, Save, CalendarMonth } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';

// Dynamically import TimePicker to avoid SSR issues
const TimePicker = dynamic(
  () => import('@mui/x-date-pickers/TimePicker').then((mod) => mod.TimePicker),
  { ssr: false }
);

// Localized day names in Hebrew
const DAYS_OF_WEEK = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

// Initial settings (would normally come from Firebase)
const initialAvailability = [
  { day: 0, active: true, startTime: dayjs().set('hour', 9).set('minute', 0), endTime: dayjs().set('hour', 20).set('minute', 0) },
  { day: 1, active: true, startTime: dayjs().set('hour', 9).set('minute', 0), endTime: dayjs().set('hour', 20).set('minute', 0) },
  { day: 2, active: true, startTime: dayjs().set('hour', 9).set('minute', 0), endTime: dayjs().set('hour', 20).set('minute', 0) },
  { day: 3, active: true, startTime: dayjs().set('hour', 9).set('minute', 0), endTime: dayjs().set('hour', 20).set('minute', 0) },
  { day: 4, active: true, startTime: dayjs().set('hour', 8).set('minute', 0), endTime: dayjs().set('hour', 21).set('minute', 0) },
  { day: 5, active: true, startTime: dayjs().set('hour', 8).set('minute', 0), endTime: dayjs().set('hour', 15).set('minute', 0) },
  { day: 6, active: false, startTime: dayjs().set('hour', 0).set('minute', 0), endTime: dayjs().set('hour', 0).set('minute', 0) },
];

const initialSpecialDays = [
  { date: '2024-04-25', name: 'יום העצמאות', isWorkDay: false },
  { date: '2024-05-12', name: 'שעות מיוחדות', isWorkDay: true, startTime: dayjs().set('hour', 10).set('minute', 0), endTime: dayjs().set('hour', 14).set('minute', 0) },
];

export default function SettingsPage() {
  const router = useRouter();
  const [availability, setAvailability] = useState(initialAvailability);
  const [specialDays, setSpecialDays] = useState(initialSpecialDays);
  const [appointmentDuration, setAppointmentDuration] = useState(30); // in minutes
  const [newSpecialDay, setNewSpecialDay] = useState({
    date: '',
    name: '',
    isWorkDay: false,
    startTime: dayjs().set('hour', 9).set('minute', 0),
    endTime: dayjs().set('hour', 17).set('minute', 0),
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDayToggle = (dayIndex: number) => {
    const newAvailability = [...availability];
    newAvailability[dayIndex].active = !newAvailability[dayIndex].active;
    setAvailability(newAvailability);
  };

  const handleTimeChange = (dayIndex: number, field: 'startTime' | 'endTime', newValue: dayjs.Dayjs | null) => {
    if (newValue) {
      const newAvailability = [...availability];
      newAvailability[dayIndex][field] = newValue;
      setAvailability(newAvailability);
    }
  };

  const handleNewSpecialDayChange = (field: string, value: any) => {
    setNewSpecialDay({
      ...newSpecialDay,
      [field]: value,
    });
  };

  const addSpecialDay = () => {
    if (newSpecialDay.date && newSpecialDay.name) {
      setSpecialDays([...specialDays, { ...newSpecialDay }]);
      // Reset form
      setNewSpecialDay({
        date: '',
        name: '',
        isWorkDay: false,
        startTime: dayjs().set('hour', 9).set('minute', 0),
        endTime: dayjs().set('hour', 17).set('minute', 0),
      });
    }
  };

  const removeSpecialDay = (index: number) => {
    const newSpecialDays = [...specialDays];
    newSpecialDays.splice(index, 1);
    setSpecialDays(newSpecialDays);
  };

  const handleSaveSettings = () => {
    // Here you would save the settings to Firebase
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000);
  };

  return (
    <Box 
      sx={{ 
        p: 3,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
      {!mounted ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Typography>טוען...</Typography>
        </Box>
      ) : (
        <>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 'bold',
              color: '#1e3c72'
            }}
          >
            הגדרות המספרה
          </Typography>
          <Container maxWidth="lg">
            {showSuccessAlert && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{ mb: 3 }}
              >
                <Alert severity="success">
                  ההגדרות נשמרו בהצלחה!
                </Alert>
              </Box>
            )}
            
            <Grid container spacing={3}>
              {/* Regular Working Hours */}
              <Grid item xs={12} md={7}>
                <Paper 
                  component={motion.div}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  sx={{ p: 3, mb: 3 }}
                >
                  <Typography variant="h6" gutterBottom>
                    שעות עבודה קבועות
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    הגדר את שעות הפעילות הקבועות שלך לכל יום בשבוע
                  </Typography>

                  {availability.map((day, index) => (
                    <Card 
                      key={index} 
                      variant="outlined" 
                      sx={{ mb: 2, opacity: day.active ? 1 : 0.7 }}
                    >
                      <CardContent sx={{ py: 2 }}>
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={12} sm={4}>
                            <FormControlLabel 
                              control={
                                <Switch 
                                  checked={day.active} 
                                  onChange={() => handleDayToggle(index)} 
                                  color="primary"
                                />
                              }
                              label={DAYS_OF_WEEK[day.day]}
                            />
                          </Grid>
                          {day.active && mounted && (
                            <>
                              <Grid item xs={12} sm={4}>
                                <TimePicker
                                  label="שעת התחלה"
                                  value={day.startTime}
                                  onChange={(newValue) => handleTimeChange(index, 'startTime', newValue)}
                                  slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <TimePicker
                                  label="שעת סיום"
                                  value={day.endTime}
                                  onChange={(newValue) => handleTimeChange(index, 'endTime', newValue)}
                                  slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                                />
                              </Grid>
                            </>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      <strong>הערה:</strong> ערבי חג המספרה פתוחה במתכונת ימי שישי. ימי שבת וחגים המספרה סגורה.
                    </Typography>
                  </Box>
                </Paper>
                
                <Paper 
                  component={motion.div}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  sx={{ p: 3 }}
                >
                  <Typography variant="h6" gutterBottom>
                    הגדרות נוספות
                  </Typography>
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="משך תור (בדקות)"
                        type="number"
                        value={appointmentDuration}
                        onChange={(e) => setAppointmentDuration(Number(e.target.value))}
                        InputProps={{ inputProps: { min: 5, max: 120, step: 5 } }}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              
              {/* Special Days */}
              <Grid item xs={12} md={5}>
                <Paper 
                  component={motion.div}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  sx={{ p: 3 }}
                >
                  <Typography variant="h6" gutterBottom>
                    ימים מיוחדים
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    הגדר ימים מיוחדים כמו חגים או ימים עם שעות פעילות שונות
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      הוסף יום מיוחד
                    </Typography>
                    
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="תאריך"
                          type="date"
                          value={newSpecialDay.date}
                          onChange={(e) => handleNewSpecialDayChange('date', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          size="small"
                          label="שם היום/סיבה"
                          value={newSpecialDay.name}
                          onChange={(e) => handleNewSpecialDayChange('name', e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel 
                          control={
                            <Checkbox 
                              checked={newSpecialDay.isWorkDay} 
                              onChange={(e) => handleNewSpecialDayChange('isWorkDay', e.target.checked)} 
                            />
                          }
                          label="יום עבודה (עם שעות מיוחדות)"
                        />
                      </Grid>
                      
                      {newSpecialDay.isWorkDay && mounted && (
                        <>
                          <Grid item xs={6}>
                            <TimePicker
                              label="שעת התחלה"
                              value={newSpecialDay.startTime}
                              onChange={(newValue) => handleNewSpecialDayChange('startTime', newValue)}
                              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TimePicker
                              label="שעת סיום"
                              value={newSpecialDay.endTime}
                              onChange={(newValue) => handleNewSpecialDayChange('endTime', newValue)}
                              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                            />
                          </Grid>
                        </>
                      )}
                      
                      <Grid item xs={12}>
                        <Button
                          fullWidth
                          variant="outlined"
                          startIcon={<Add />}
                          onClick={addSpecialDay}
                          disabled={!newSpecialDay.date || !newSpecialDay.name}
                        >
                          הוסף
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                  
                  <Divider sx={{ mb: 2 }} />
                  
                  <Typography variant="subtitle2" gutterBottom>
                    ימים מיוחדים שהוגדרו ({specialDays.length})
                  </Typography>
                  
                  {specialDays.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 2 }}>
                      לא הוגדרו ימים מיוחדים
                    </Typography>
                  ) : (
                    specialDays.map((day, index) => (
                      <Card 
                        key={index} 
                        variant="outlined" 
                        sx={{ mb: 2 }}
                        component={motion.div}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CardContent sx={{ py: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CalendarMonth fontSize="small" sx={{ mr: 1, color: day.isWorkDay ? 'primary.main' : 'error.main' }} />
                              <Typography variant="subtitle2">{day.name}</Typography>
                            </Box>
                            <IconButton 
                              size="small" 
                              color="error" 
                              onClick={() => removeSpecialDay(index)}
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(day.date).toLocaleDateString('he-IL')}
                          </Typography>
                          {day.isWorkDay && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              שעות: {day.startTime?.format('HH:mm')} - {day.endTime?.format('HH:mm')}
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  )}
                </Paper>
              </Grid>
            </Grid>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={() => router.push('/admin/dashboard')}
              >
                חזרה ללוח הבקרה
              </Button>
              
              <Button
                variant="contained"
                color="primary"
                startIcon={<Save />}
                onClick={handleSaveSettings}
              >
                שמור הגדרות
              </Button>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
} 