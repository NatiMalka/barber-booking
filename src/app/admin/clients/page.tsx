'use client';

import { useState, useEffect } from 'react';
import { Box, Container, Typography, Paper, Grid, Button, 
  Divider, List, ListItem, ListItemText, Chip, IconButton, Avatar, 
  Tab, Tabs, TextField, InputAdornment, Card, CardContent } from '@mui/material';
import { ContentCut, Search, ArrowBack, Phone, CalendarMonth, Edit, Delete } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// Define types for our data
interface Client {
  id: number;
  name: string;
  phone: string;
  email?: string;
  lastVisit?: string;
  totalVisits: number;
  favoriteService?: string;
}

// Mock data for clients
const mockClients: Client[] = [
  { id: 1, name: 'דוד כהן', phone: '050-1234567', email: 'david@example.com', lastVisit: '2024-03-10', totalVisits: 15, favoriteService: 'תספורת גברים' },
  { id: 2, name: 'יעל לוי', phone: '052-7654321', email: 'yael@example.com', lastVisit: '2024-03-08', totalVisits: 8, favoriteService: 'צבע שיער' },
  { id: 3, name: 'משה גולן', phone: '054-9876543', email: 'moshe@example.com', lastVisit: '2024-03-12', totalVisits: 20, favoriteService: 'תספורת + זקן' },
  { id: 4, name: 'רונית אברהם', phone: '053-1472583', email: 'ronit@example.com', lastVisit: '2024-02-28', totalVisits: 5, favoriteService: 'תספורת נשים' },
  { id: 5, name: 'אבי כהן', phone: '058-3692581', email: 'avi@example.com', lastVisit: '2024-03-05', totalVisits: 12, favoriteService: 'תספורת גברים' },
  { id: 6, name: 'מיכל דוד', phone: '050-9517538', email: 'michal@example.com', lastVisit: '2024-03-01', totalVisits: 7, favoriteService: 'צבע שיער' },
  { id: 7, name: 'יוסי לוי', phone: '052-8529637', email: 'yossi@example.com', lastVisit: '2024-02-20', totalVisits: 3, favoriteService: 'תספורת גברים' },
  { id: 8, name: 'שרה כהן', phone: '054-7539514', email: 'sara@example.com', lastVisit: '2024-03-11', totalVisits: 10, favoriteService: 'תספורת נשים' },
];

export default function ClientsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  
  useEffect(() => {
    // Filter clients based on search term
    if (searchTerm) {
      const filtered = mockClients.filter(client => 
        client.name.includes(searchTerm) || 
        client.phone.includes(searchTerm) ||
        client.email?.includes(searchTerm) ||
        client.favoriteService?.includes(searchTerm)
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(mockClients);
    }
  }, [searchTerm]);
  
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'לא ידוע';
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', { day: 'numeric', month: 'long', year: 'numeric' });
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
            ניהול לקוחות 
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
              placeholder="חיפוש לפי שם, טלפון או אימייל"
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
          
          <Divider sx={{ mb: 3 }} />
          
          {filteredClients.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                לא נמצאו לקוחות
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredClients.map((client, index) => (
                <Grid item xs={12} sm={6} md={4} key={client.id}>
                  <Card 
                    component={motion.div}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    variant="outlined"
                    sx={{ height: '100%' }}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ width: 50, height: 50, mr: 2, bgcolor: 'primary.main' }}>
                          {client.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{client.name}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Phone fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                            <Typography variant="body2" color="text.secondary">
                              {client.phone}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Box sx={{ mb: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          אימייל:
                        </Typography>
                        <Typography variant="body2">
                          {client.email || 'לא הוזן'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ mb: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          ביקור אחרון:
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CalendarMonth fontSize="small" sx={{ mr: 0.5, fontSize: '0.9rem' }} />
                          <Typography variant="body2">
                            {formatDate(client.lastVisit)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">
                          מספר ביקורים:
                        </Typography>
                        <Typography variant="body2">
                          {client.totalVisits}
                        </Typography>
                      </Box>
                      
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          שירות מועדף:
                        </Typography>
                        <Typography variant="body2">
                          {client.favoriteService || 'לא ידוע'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        mt: 2, 
                        pt: 2, 
                        borderTop: '1px dashed rgba(0,0,0,0.1)' 
                      }}>
                        <Button size="small" startIcon={<Edit />}>
                          עריכה
                        </Button>
                        <Button size="small" startIcon={<Delete />} color="error">
                          מחיקה
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Container>
    </Box>
  );
} 