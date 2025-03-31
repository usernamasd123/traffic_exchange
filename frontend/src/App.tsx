import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Container,
    Box,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import { LoginForm } from './components/auth/LoginForm';
import { RegisterForm } from './components/auth/RegisterForm';
import { TrafficRequestList } from './components/traffic/TrafficRequestList';
import { TrafficProviderList } from './components/traffic/TrafficProviderList';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Биржа трафика
                            </Typography>
                            <Button color="inherit" component={Link} to="/">
                                Главная
                            </Button>
                            <Button color="inherit" component={Link} to="/requests">
                                Заявки
                            </Button>
                            <Button color="inherit" component={Link} to="/providers">
                                Поставщики
                            </Button>
                            {isAuthenticated ? (
                                <Button color="inherit" onClick={() => localStorage.removeItem('token')}>
                                    Выйти
                                </Button>
                            ) : (
                                <>
                                    <Button color="inherit" component={Link} to="/login">
                                        Войти
                                    </Button>
                                    <Button color="inherit" component={Link} to="/register">
                                        Регистрация
                                    </Button>
                                </>
                            )}
                        </Toolbar>
                    </AppBar>
                    <Container>
                        <Routes>
                            <Route path="/" element={<TrafficRequestList />} />
                            <Route path="/requests" element={<TrafficRequestList />} />
                            <Route path="/providers" element={<TrafficProviderList />} />
                            <Route path="/login" element={<LoginForm />} />
                            <Route path="/register" element={<RegisterForm />} />
                        </Routes>
                    </Container>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
