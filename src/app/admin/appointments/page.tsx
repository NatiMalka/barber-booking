'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Grid, Button, 
  Divider, List, ListItem, ListItemText, Chip, IconButton, Avatar, 
  Tab, Tabs, TextField, InputAdornment } from '@mui/material';
import { CheckCircle, Cancel, AccessTime, Search, ArrowBack, ContentCut } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Define types for our data
interface Appointment {
  id: number;
  name: string;
  date: string;
  time: string;
  status: 'approved' | 'pending' | 'rejected';
  phone?: string;
  service?: string;
}

// Mock data for appointments
const mockAppointments: Appointment[] = [
  { id: 1, name: 'דוד כהן', date: '2024-03-15', time: '10:00', status: 'approved', phone: '050-1234567', service: 'תספורת גברים' },
  { id: 2, name: 'יעל לוי', date: '2024-03-15', time: '11:00', status: 'pending', phone: '052-7654321', service: 'צבע שיער' },
  { id: 3, name: 'משה גולן', date: '2024-03-15', time: '12:00', status: 'approved', phone: '054-9876543', service: 'תספורת + זקן' },
  { id: 4, name: 'רונית אברהם', date: '2024-03-16', time: '09:30', status: 'pending', phone: '053-1472583', service: 'תספורת נשים' },
  { id: 5, name: 'אבי כהן', date: '2024-03-16', time: '10:30', status: 'approved', phone: '058-3692581', service: 'תספורת גברים' },
  { id: 6, name: 'מיכל דוד', date: '2024-03-17', time: '13:00', status: 'approved', phone: '050-9517538', service: 'צבע שיער' },
  { id: 7, name: 'יוסי לוי', date: '2024-03-17', time: '14:00', status: 'pending', phone: '052-8529637', service: 'תספורת גברים' },
  { id: 8, name: 'שרה כהן', date: '2024-03-18', time: '11:30', status: 'approved', phone: '054-7539514', service: 'תספורת נשים' },
];

export default function AppointmentsPage() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([]);
  
  useEffect(() => {
    // Filter appointments based on tab and search term
    let filtered = [...mockAppointments];
    
    // Filter by tab
    if (tabValue === 1) {
      filtered = filtered.filter(app => app.status === 'pending');
    } else if (tabValue === 2) {
      filtered = filtered.filter(app => app.status === 'approved');
    } else if (tabValue === 3) {
      filtered = filtered.filter(app => app.status === 'rejected');
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.name.includes(searchTerm) || 
        app.phone?.includes(searchTerm) ||
        app.service?.includes(searchTerm)
      );
    }
    
    setFilteredAppointments(filtered);
  }, [tabValue, searchTerm]);
  
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
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 4,
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      }}
    >
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
            ניהול תורים 
            <ContentCut sx={{ ml: 1, transform: 'rotate(-90deg)', fontSize: '1rem' }} />
          </Typography>
        </Box>
        
        <Paper 
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ p: 3, mb: 3 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => router.push('/admin/dashboard')}
            >
              חזרה ללוח בקרה
            </Button>
            
            <TextField
              placeholder="חיפוש לפי שם, טלפון או שירות"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 300 }}
            />
          </Box>
          
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{ mb: 3 }}
          >
            <Tab label="כל התורים" />
            <Tab label="ממתינים לאישור" />
            <Tab label="מאושרים" />
            <Tab label="נדחו" />
          </Tabs>
          
          <Divider sx={{ mb: 3 }} />
          
          {filteredAppointments.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                לא נמצאו תורים
              </Typography>
            </Box>
          ) : (
            <List>
              {filteredAppointments.map((appointment, index) => (
                <ListItem 
                  key={appointment.id}
                  component={motion.li}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  sx={{ 
                    mb: 2, 
                    borderRadius: 2,
                    p: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.paper'
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ width: 40, height: 40, mr: 1, bgcolor: 'primary.main' }}>
                          {appointment.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body1" fontWeight="bold">
                            {appointment.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {appointment.phone}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
                        <Typography variant="body2">
                          {formatDate(appointment.date)} | {appointment.time}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {appointment.service}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
} 