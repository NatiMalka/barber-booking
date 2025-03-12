import { Box, Container, Typography, Button, Paper, Grid } from '@mui/material';
import { CalendarMonth, Person, Notifications } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #6b73ff 0%, #000dff 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          {/* Header */}
          <Box 
            component={motion.div}
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ textAlign: 'center', mb: 6 }}
          >
            <Typography variant="h2" component="h1" sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}>
              מערכת זימון תורים
            </Typography>
            <Typography variant="h5" sx={{ color: 'white' }}>
              הזמן תור בקלות ובמהירות
            </Typography>
          </Box>
          
          {/* Main Content */}
          <Grid container spacing={4} justifyContent="center">
            {/* Client Section */}
            <Grid item xs={12} md={6}>
              <Paper 
                component={motion.div}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                  לקוחות
                </Typography>
                <Box sx={{ textAlign: 'center', my: 3 }}>
                  <Person sx={{ fontSize: 80, color: 'primary.main' }} />
                </Box>
                <Typography variant="body1" paragraph align="center">
                  הזמן תור חדש, צפה בתורים קיימים, או בטל תורים בקלות ובמהירות.
                </Typography>
                <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                  <Button 
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="contained" 
                    size="large" 
                    href="/client"
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      fontSize: '1.1rem'
                    }}
                  >
                    כניסה למערכת הלקוחות
                  </Button>
                </Box>
              </Paper>
            </Grid>
            
            {/* Admin Section */}
            <Grid item xs={12} md={6}>
              <Paper 
                component={motion.div}
                whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Typography variant="h4" component="h2" align="center" gutterBottom>
                  ניהול (ספר)
                </Typography>
                <Box sx={{ textAlign: 'center', my: 3 }}>
                  <CalendarMonth sx={{ fontSize: 80, color: 'secondary.main' }} />
                </Box>
                <Typography variant="body1" paragraph align="center">
                  נהל תורים, צפה בלוח זמנים, אשר או דחה בקשות לתורים.
                </Typography>
                <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                  <Button 
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="contained" 
                    color="secondary" 
                    size="large" 
                    href="/admin"
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      fontSize: '1.1rem'
                    }}
                  >
                    כניסה לממשק הניהול
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          {/* Features Section */}
          <Box 
            component={motion.div}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            sx={{ mt: 8, textAlign: 'center' }}
          >
            <Typography variant="h4" component="h2" sx={{ color: 'white', mb: 4 }}>
              למה כדאי להשתמש במערכת שלנו?
            </Typography>
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Paper
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  sx={{ p: 3, borderRadius: 3, height: '100%' }}
                >
                  <CalendarMonth sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    זימון תורים מהיר
                  </Typography>
                  <Typography variant="body2">
                    קבע תור במספר קליקים פשוטים, בדוק זמינות בזמן אמת.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  sx={{ p: 3, borderRadius: 3, height: '100%' }}
                >
                  <Notifications sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    התראות אוטומטיות
                  </Typography>
                  <Typography variant="body2">
                    קבל תזכורות על תורים קרובים דרך וואטסאפ, אימייל או SMS.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper
                  component={motion.div}
                  whileHover={{ y: -5 }}
                  sx={{ p: 3, borderRadius: 3, height: '100%' }}
                >
                  <Person sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    ניהול פרופיל אישי
                  </Typography>
                  <Typography variant="body2">
                    צפה בהיסטוריית התורים שלך ונהל את הפרטים האישיים בקלות.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
          
          {/* Footer */}
          <Box
            component={motion.footer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            sx={{ 
              mt: 8, 
              pt: 3, 
              textAlign: 'center',
              color: 'white',
              borderTop: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <Typography variant="body2">
              © {new Date().getFullYear()} מערכת זימון תורים לספר | כל הזכויות שמורות
            </Typography>
          </Box>
        </Container>
      </Box>
    </main>
  );
}
