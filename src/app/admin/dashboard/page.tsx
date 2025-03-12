'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Grid, Button, Card, CardContent, 
  Divider, List, ListItem, ListItemText, Chip, IconButton, Avatar } from '@mui/material';
import { Settings, CalendarMonth, Person, ContentCut, CheckCircle, Cancel, AccessTime } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Define types for our data
interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
  status: 'approved' | 'pending' | 'rejected';
}

interface WorkingHour {
  day: string;
  hours: string;
}

// Mock data for appointments
const mockAppointments: Appointment[] = [
  { id: 1, name: 'דוד כהן', date: '2024-03-15', time: '10:00', status: 'approved' },
  { id: 2, name: 'יעל לוי', date: '2024-03-15', time: '11:00', status: 'pending' },
  { id: 3, name: 'משה גולן', date: '2024-03-15', time: '12:00', status: 'approved' },
  { id: 4, name: 'רונית אברהם', date: '2024-03-16', time: '09:30', status: 'pending' },
  { id: 5, name: 'אבי כהן', date: '2024-03-16', time: '10:30', status: 'approved' },
];

// Working hours for today
const workingHours: WorkingHour[] = [
  { day: 'ימי א - ד', hours: '09:00 - 20:00' },
  { day: 'יום ה', hours: '08:00 - 21:00' },
  { day: 'יום ו', hours: '08:00 - 15:00' },
  { day: 'ערבי חג', hours: 'במתכונת ימי שישי' },
  { day: 'שבת וחגים', hours: 'סגור' }
];

export default function DashboardPage() {
  const router = useRouter();
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<Appointment[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch from Firebase
    const today = new Date().toISOString().split('T')[0];
    setTodayAppointments(mockAppointments.filter(app => app.date === '2024-03-15'));
    setUpcomingAppointments(mockAppointments.filter(app => app.date === '2024-03-16'));
  }, []);
  
  const getStatusColor = (status: Appointment['status']) => {
    switch(status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };
  
  const getStatusText = (status: Appointment['status']) => {
    switch(status) {
      case 'approved': return 'מאושר';
      case 'pending': return 'ממתין לאישור';
      case 'rejected': return 'נדחה';
      default: return '';
    }
  };
  
  const getStatusIcon = (status: Appointment['status']) => {
    switch(status) {
      case 'approved': return <CheckCircle fontSize="small" />;
      case 'pending': return <AccessTime fontSize="small" />;
      case 'rejected': return <Cancel fontSize="small" />;
      default: return undefined;
    }
  };
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' });
  };
  
  return (
    <Box 
      sx={{ 
        p: 3,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
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
        דשבורד ניהול
      </Typography>
      <Container maxWidth="lg">
        {/* Header */}
        <Box 
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ mb: 4, textAlign: 'center' }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            מספרת בר ארזי
          </Typography>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'text.secondary' }}>
            <ContentCut sx={{ mr: 1, transform: 'rotate(90deg)', fontSize: '1rem' }} /> 
            לוח בקרה 
            <ContentCut sx={{ ml: 1, transform: 'rotate(-90deg)', fontSize: '1rem' }} />
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {/* Today's Summary */}
          <Grid item xs={12} md={8}>
            <Paper 
              component={motion.div}
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              sx={{ p: 3, height: '100%' }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  התורים להיום
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date().toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}
                </Typography>
              </Box>
              
              <Divider sx={{ mb: 2 }} />
              
              {todayAppointments.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="body1" color="text.secondary">
                    אין תורים מתוכננים להיום
                  </Typography>
                </Box>
              ) : (
                <List>
                  {todayAppointments.map((appointment) => (
                    <ListItem 
                      key={appointment.id}
                      component={motion.li}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      sx={{ 
                        mb: 1, 
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                      secondaryAction={
                        <Box>
                          <Chip 
                            size="small"
                            label={getStatusText(appointment.status)}
                            color={getStatusColor(appointment.status) as any}
                            icon={getStatusIcon(appointment.status)}
                            sx={{ mr: 1 }}
                          />
                          {appointment.status === 'pending' && (
                            <>
                              <IconButton size="small" color="success">
                                <CheckCircle fontSize="small" />
                              </IconButton>
                              <IconButton size="small" color="error">
                                <Cancel fontSize="small" />
                              </IconButton>
                            </>
                          )}
                        </Box>
                      }
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: 'primary.main' }}>
                              {appointment.name.charAt(0)}
                            </Avatar>
                            <Typography variant="body1">{appointment.name}</Typography>
                          </Box>
                        }
                        secondary={`שעה: ${appointment.time}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button 
                  variant="outlined" 
                  color="primary"
                  onClick={() => router.push('/admin/appointments')}
                >
                  צפה בכל התורים
                </Button>
              </Box>
            </Paper>
          </Grid>
          
          {/* Quick Info */}
          <Grid item xs={12} md={4}>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <Paper 
                  component={motion.div}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  sx={{ p: 3 }}
                >
                  <Typography variant="h6" gutterBottom>
                    שעות פעילות
                  </Typography>
                  
                  <List dense>
                    {workingHours.map((item, index) => (
                      <ListItem 
                        key={index}
                        sx={{ 
                          py: 0.5,
                          borderBottom: index < workingHours.length - 1 ? '1px dashed rgba(0,0,0,0.1)' : 'none'
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" fontWeight={item.day === 'שבת וחגים' ? 'bold' : 'normal'}>
                                {item.day}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                color={item.day === 'שבת וחגים' ? 'error.main' : 'text.primary'}
                                fontWeight={item.day === 'שבת וחגים' ? 'bold' : 'normal'}
                              >
                                {item.hours}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>
              
              <Grid item>
                <Paper 
                  component={motion.div}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  sx={{ p: 3 }}
                >
                  <Typography variant="h6" gutterBottom>
                    פעולות מהירות
                  </Typography>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Settings />}
                    onClick={() => router.push('/admin/settings')}
                    sx={{ mb: 2 }}
                  >
                    הגדרות זמינות
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<CalendarMonth />}
                    onClick={() => router.push('/admin/appointments')}
                    sx={{ mb: 2 }}
                  >
                    ניהול תורים
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Person />}
                    onClick={() => router.push('/admin/clients')}
                  >
                    ניהול לקוחות
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          
          {/* Upcoming Appointments */}
          <Grid item xs={12}>
            <Paper 
              component={motion.div}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              sx={{ p: 3 }}
            >
              <Typography variant="h6" gutterBottom>
                תורים קרובים
              </Typography>
              
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                {upcomingAppointments.length === 0 ? (
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        אין תורים קרובים
                      </Typography>
                    </Box>
                  </Grid>
                ) : (
                  upcomingAppointments.map((appointment) => (
                    <Grid item xs={12} sm={6} md={4} key={appointment.id}>
                      <Card 
                        variant="outlined"
                        component={motion.div}
                        whileHover={{ y: -5, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                      >
                        <CardContent>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle1">{appointment.name}</Typography>
                            <Chip 
                              size="small"
                              label={getStatusText(appointment.status)}
                              color={getStatusColor(appointment.status)}
                              icon={getStatusIcon(appointment.status)}
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {formatDate(appointment.date)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            שעה: {appointment.time}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
} 