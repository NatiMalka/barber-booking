'use client';

import { useState } from 'react';
import { Box, Container, Typography, Paper, Tabs, Tab, Button, Divider, Chip, Grid, IconButton } from '@mui/material';
import { Check, Close, CalendarMonth, Person, Schedule, Settings, ExitToApp, Refresh, Phone, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// Sample data - in a real application, this would come from Firebase
const pendingAppointments = [
  { id: 1, name: 'דני לוי', date: '15/03/2024', time: '10:00', peopleCount: 1, contactInfo: '050-1234567', notificationMethod: 'WhatsApp' },
  { id: 2, name: 'רונית כהן', date: '15/03/2024', time: '11:30', peopleCount: 2, contactInfo: 'ronit@example.com', notificationMethod: 'Email' },
  { id: 3, name: 'יוסי מזרחי', date: '16/03/2024', time: '14:00', peopleCount: 1, contactInfo: '052-9876543', notificationMethod: 'SMS' },
];

const approvedAppointments = [
  { id: 4, name: 'דוד ישראלי', date: '14/03/2024', time: '09:00', peopleCount: 1, contactInfo: '054-1122334', notificationMethod: 'WhatsApp' },
  { id: 5, name: 'מיכל אברהם', date: '14/03/2024', time: '15:30', peopleCount: 3, contactInfo: 'michal@example.com', notificationMethod: 'Email' },
];

export default function AdminDashboard() {
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleLogout = () => {
    router.push('/admin');
  };

  const handleApprove = (id: number) => {
    // In a real app, this would update the appointment status in Firebase
    alert(`תור #${id} אושר`);
  };

  const handleReject = (id: number) => {
    // In a real app, this would update the appointment status in Firebase
    alert(`תור #${id} נדחה`);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      sx={{
        minHeight: '100vh',
        background: '#f5f5f5',
      }}
    >
      {/* Header */}
      <Box 
        sx={{ 
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" component="h1">
          ממשק ניהול תורים
        </Typography>
        <Button 
          startIcon={<ExitToApp />}
          variant="outlined" 
          color="inherit"
          onClick={handleLogout}
        >
          התנתק
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Paper 
              component={motion.div}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              elevation={2} 
              sx={{ p: 2, mb: 3 }}
            >
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Person sx={{ fontSize: 60, color: 'primary.main' }} />
                <Typography variant="h6">ברוך הבא, ספר</Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date().toLocaleDateString('he-IL')}
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">תורים להיום:</Typography>
                <Chip label="2" color="primary" size="small" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">בקשות ממתינות:</Typography>
                <Chip label="3" color="warning" size="small" />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">סה"כ תורים השבוע:</Typography>
                <Chip label="12" color="default" size="small" />
              </Box>
            </Paper>

            <Paper 
              component={motion.div}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              elevation={2} 
              sx={{ p: 2 }}
            >
              <Typography variant="subtitle1" gutterBottom>
                פעולות מהירות
              </Typography>
              <Button 
                fullWidth 
                startIcon={<Settings />}
                variant="outlined" 
                sx={{ mb: 1 }}
                href="/admin/settings"
              >
                הגדרות זמינות
              </Button>
              <Button 
                fullWidth 
                startIcon={<Refresh />}
                variant="outlined"
                onClick={() => alert('רענון נתונים')}
              >
                רענן נתונים
              </Button>
            </Paper>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Paper 
              component={motion.div}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              elevation={2}
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                  value={tabValue} 
                  onChange={handleTabChange} 
                  aria-label="appointment tabs"
                  variant="fullWidth"
                >
                  <Tab icon={<Schedule />} label="בקשות ממתינות" />
                  <Tab icon={<CalendarMonth />} label="תורים מאושרים" />
                </Tabs>
              </Box>

              {/* Pending Requests Tab */}
              <TabPanel value={tabValue} index={0}>
                <Box 
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h6" gutterBottom>
                    בקשות לתיאום תור ({pendingAppointments.length})
                  </Typography>
                  
                  {pendingAppointments.length === 0 ? (
                    <Typography variant="body1" align="center" sx={{ py: 4 }}>
                      אין בקשות ממתינות כרגע
                    </Typography>
                  ) : (
                    pendingAppointments.map((appointment) => (
                      <Paper 
                        key={appointment.id} 
                        sx={{ p: 2, mb: 2, borderRight: 4, borderColor: 'warning.main' }}
                        component={motion.div}
                        whileHover={{ y: -5, boxShadow: 3 }}
                      >
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={12} sm={5}>
                            <Typography variant="subtitle1">{appointment.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {appointment.date} | {appointment.time}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Chip 
                                size="small" 
                                label={`${appointment.peopleCount} אנשים`} 
                                color="primary" 
                                sx={{ mr: 1 }} 
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {appointment.notificationMethod === 'Email' ? (
                                <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              ) : (
                                <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              )}
                              <Typography variant="body2" noWrap>
                                {appointment.contactInfo}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              התראה: {appointment.notificationMethod}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <IconButton 
                              color="success" 
                              onClick={() => handleApprove(appointment.id)}
                              sx={{ mr: 1 }}
                            >
                              <Check />
                            </IconButton>
                            <IconButton 
                              color="error" 
                              onClick={() => handleReject(appointment.id)}
                            >
                              <Close />
                            </IconButton>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))
                  )}
                </Box>
              </TabPanel>

              {/* Approved Appointments Tab */}
              <TabPanel value={tabValue} index={1}>
                <Box 
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography variant="h6" gutterBottom>
                    תורים מאושרים ({approvedAppointments.length})
                  </Typography>
                  
                  {approvedAppointments.length === 0 ? (
                    <Typography variant="body1" align="center" sx={{ py: 4 }}>
                      אין תורים מאושרים כרגע
                    </Typography>
                  ) : (
                    approvedAppointments.map((appointment) => (
                      <Paper 
                        key={appointment.id} 
                        sx={{ p: 2, mb: 2, borderRight: 4, borderColor: 'success.main' }}
                        component={motion.div}
                        whileHover={{ y: -5, boxShadow: 3 }}
                      >
                        <Grid container alignItems="center" spacing={2}>
                          <Grid item xs={12} sm={5}>
                            <Typography variant="subtitle1">{appointment.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {appointment.date} | {appointment.time}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                              <Chip 
                                size="small" 
                                label={`${appointment.peopleCount} אנשים`} 
                                color="primary" 
                                sx={{ mr: 1 }} 
                              />
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={4}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {appointment.notificationMethod === 'Email' ? (
                                <Email fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              ) : (
                                <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              )}
                              <Typography variant="body2" noWrap>
                                {appointment.contactInfo}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                              התראה: {appointment.notificationMethod}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => alert(`ביטול תור #${appointment.id}`)}
                            >
                              בטל תור
                            </Button>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))
                  )}
                </Box>
              </TabPanel>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box 
        component="footer" 
        sx={{ 
          background: '#e0e0e0', 
          py: 2, 
          textAlign: 'center',
          position: 'fixed',
          bottom: 0,
          width: '100%',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} מערכת זימון תורים לספר | גרסה 1.0
        </Typography>
      </Box>
    </Box>
  );
} 